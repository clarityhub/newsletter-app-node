import { Component } from 'react';
import { string } from 'prop-types';

import checkIfOkay from '../../utilities/checkIfOkay';

export default class CreateEditCampaignContainer extends Component {
    static propTypes = {
        actionUrl: string,
    }

    state = {
        performing: false,
        error: false,
        data: null,
    }

    performAction = () => {
        const { actionUrl } = this.props;

        return new Promise((resolve, reject) => {
            this.setState(() => ({
                performing: true,
                error: false,
            }), async () => {
                try {
                    const data = await fetch(actionUrl, {
                        method: 'DELETE',
                        mode: 'cors',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then(checkIfOkay);
        
                    this.setState(() => ({
                        data,
                        performing: false,
                        error: false,
                    }), resolve);
                } catch (error) {
                    this.setState(() => ({
                        performing: false,
                        error,
                    }), reject);
                }
            });
        });

    }

    render() {
        const {
            data,
            performing,
            error,
        } = this.state;
        const { children } = this.props;

        return children({
            performing,
            error,
            data,
            performAction: this.performAction,
        });
    }
}

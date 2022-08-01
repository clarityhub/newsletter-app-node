import { Component } from 'react';
import { string } from 'prop-types';

import checkIfOkay from '../../utilities/checkIfOkay';

export default class CreateEditCampaignContainer extends Component {
    static propTypes = {
        dataUrl: string,
    }

    state = {
        loading: false,
        loaded: false,
        error: false,
        data: null,
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataUrl !== this.props.dataUrl) {
            this.load();
        }
    }

    load = () => {
        const { dataUrl } = this.props;

        this.setState(() => ({
            loading: true,
            loaded: false,
            error: false,
        }), async () => {
            // XXX Try-catch
            const data = await fetch(dataUrl).then(checkIfOkay);

            this.setState(() => ({
                data,
                loading: false,
                loaded: true,
                error: false,
            }));
        });
    }

    render() {
        const {
            data,
            loading,
            loaded,
            error,
        } = this.state;
        const { children } = this.props;

        return children({
            loading,
            loaded,
            error,
            data,
            onSubmit: this.handleSubmit,
            refresh: this.load,
        });
    }
}

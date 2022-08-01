import { Component } from 'react';
import { string } from 'prop-types';

import checkIfOkay from '../../utilities/checkIfOkay';

export default class CreateEditCampaignContainer extends Component {
    static propTypes = {
        url: string,
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
        if (prevProps.url !== this.props.url) {
            this.load();
        }
    }

    load = () => {
        const { url } = this.props;

        this.setState(() => ({
            loading: true,
            loaded: false,
            error: false,
        }), async () => {
            // XXX Try-catch
            const html = await fetch(url).then(checkIfOkay).then((res => res.data));

            this.setState(() => ({
                html,
                loading: false,
                loaded: true,
                error: false,
            }));
        });
    }

    render() {
        const {
            html,
            loading,
            loaded,
            error,
        } = this.state;
        const { children } = this.props;

        return children({
            loading,
            loaded,
            error,
            html,
        });
    }
}

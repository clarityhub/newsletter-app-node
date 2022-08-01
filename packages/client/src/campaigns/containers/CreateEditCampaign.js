import { Component } from 'react';
import { func, string } from 'prop-types';

import checkIfOkay from '../../utilities/checkIfOkay';

export default class CreateEditCampaignContainer extends Component {
    static propTypes = {
        schemaUrl: string,
        dataUrl: string,
        onSubmitted: func,
    }

    state = {
        loading: false,
        submitting: false,
        loaded: false,
        error: false,
        schema: null,
        formData: null,
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemaUrl !== this.props.schemaUrl ||
            prevProps.dataUrl !== this.props.dataUrl) {
            this.load();
        }
    }

    load = () => {
        const { schemaUrl, dataUrl } = this.props;

        this.setState(() => ({
            loading: true,
            loaded: false,
            error: false,
        }), async () => {
            const promises = [
                fetch(schemaUrl).then(res => res.json()),
            ];
    
            if (dataUrl) {
                promises.push(fetch(dataUrl).then(checkIfOkay).then((response) => response.data));
            }
    
            // XXX Try-catch
            const [schema, formData] = await Promise.all(promises);
    
            this.setState(() => ({
                formData,
                schema,
                loading: false,
                loaded: true,
                error: false,
            }));
        });
    }

    handleSubmit = (data) => {
        const { onSubmitted, submitMethod, submitUrl } = this.props;

        this.setState({
            submitting: true,
            error: false,
        }, async () => {
            try {
                const response = await fetch(submitUrl, {
                    method: submitMethod,
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), 
                }).then(checkIfOkay);
            
                onSubmitted(response);
            } catch (error) {
                this.setState({
                    submitting: false,
                    error,
                });
            }
        });

        // XXX

        console.log(data);
    }

    render() {
        const {
            schema,
            formData,
            loading,
            loaded,
            error,
            submitting,
        } = this.state;
        const { children } = this.props;
    
        console.log(formData);

        return children({
            loading,
            loaded,
            error,
            schema,
            formData,
            submitting,
            onSubmit: this.handleSubmit,
        });
    }
}

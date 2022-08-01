import React from 'react';

import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import PreviewCampaignContainer from '../containers/PreviewCampaign';
import { BASE_API_URL } from '../../config';

const PreviewCampaign = ({ match }) => {

    const { params: { title } } = match;

    const url = `${BASE_API_URL}/campaigns/${title}/preview`;

    return (
        <PreviewCampaignContainer
            url={url}
        >
            {({ loading, loaded, error, html }) => {
                if (!loaded && !loading) {
                    // (initial state, don't render anything)
                    return null;
                }

                if (loading) {
                    return <Loading flex />;
                }

                if (!loaded && error) {
                    return (
                        <Notification type="danger" variant="block">
                            {String(error)}
                        </Notification>
                    );
                }

                return (
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                );
            }}
        </PreviewCampaignContainer>
    );
}

export default PreviewCampaign;

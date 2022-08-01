import React, { Fragment, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import Link from '@clarityhub/unity-web/lib/components/Link';
import PageTemplate from '@clarityhub/unity-web/lib/templates/PageTemplate';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { SideNavItem } from '@clarityhub/unity-web/lib/components/SideNav';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Loading from '@clarityhub/unity-web/lib/components/Loading';

import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';
import CreateEditCampaignContainer from '../containers/CreateEditCampaign';
import { BASE_API_URL } from '../../config';

const uiSchema = {
    blogPostLinks: {
        'ui:widget': 'textarea',
    },
    issueLinks: {
        'ui:widget': 'textarea',
    },
};

// XXX refactor page template with other pages

const CreateEditCampaignPage = () => {
    const [redirectTo, setRedirect] = useState(null);
    
    const submitMethod = 'POST';
    const submitUrl = `${BASE_API_URL}/campaigns/`;
    const schemaUrl = `${BASE_API_URL}/campaigns/schema/create`;
    
    const onSubmitted = (response) => {
        setRedirect(`/campaigns/${response.data.title}`);
    };

    if (redirectTo) {
        return (
            <Redirect to={redirectTo} />
        );
    }

    return (
        <PageTemplate
            breadcrumb={<Link to="/" component={RouterLink}>&lsaquo; Campaigns</Link>}
            title="Create a Campaign"
            navItems={[]}
            sideNavItems={[
                <SideNavItem>
                    <Link to="/" component={RouterLink}>Home</Link>
                </SideNavItem>,
                <SideNavItem selected>
                    <Link to="/campaigns/create" component={RouterLink}>Create Campaign</Link>
                </SideNavItem>
            ]}
        >
            <Card>
                <CardBody>
                    <CreateEditCampaignContainer
                        schemaUrl={schemaUrl}
                        submitMethod={submitMethod}
                        submitUrl={submitUrl}
                        onSubmitted={onSubmitted}
                    >
                        {({ loading, loaded, submitting, error, schema, formData, onSubmit }) => {
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
                                <Fragment>
                                    {error && (
                                        <Notification type="danger" variant="block">
                                            {String(error)}
                                        </Notification>
                                    )}
                                    <FormFromSchema
                                        schema={schema}
                                        uiSchema={uiSchema}
                                        formData={formData}
                                        onSubmit={onSubmit}
                                        submitting={submitting}
                                    />
                                </Fragment>
                            );
                        }}
                    </CreateEditCampaignContainer>
                </CardBody>
            </Card>
        </PageTemplate>
    );
}

export default CreateEditCampaignPage;

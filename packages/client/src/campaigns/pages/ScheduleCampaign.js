import React, { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@clarityhub/unity-web/lib/components/Link';
import PageTemplate from '@clarityhub/unity-web/lib/templates/PageTemplate';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { SideNavItem } from '@clarityhub/unity-web/lib/components/SideNav';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Loading from '@clarityhub/unity-web/lib/components/Loading/Loading';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';

import UnscheduleCampaignModal from '../components/UnscheduleCampaignModal';
import CreateEditCampaignController from '../containers/CreateEditCampaign';
import UnscheduleCampaignContainer from '../containers/UnscheduleCampaign';
import { BASE_API_URL } from '../../config';

const uiSchema = {
    emails: {
        email: {
            'ui:widget': 'email',
        },
    },
    scheduledTime: {
        'ui:widget': 'date-time',
    },
};

// XXX refactor page template with other pages

const ScheduleCampaign = ({ history, match }) => {
    const [renderTimestamp, setRenderTimestamp] = useState(+new Date());
    const [schdeuleStatus, setSchdeuleStatus] = useState(null);
    const [showDetachModal, setShowDetachModal] = useState(false);

    const { params: { title } } = match;

    const dataUrl = `${BASE_API_URL}/campaigns/${title}`;
    const submitMethod = 'POST';
    const submitUrl = `${BASE_API_URL}/campaigns/${title}/actions/schedule`;
    const unscheduleUrl = `${BASE_API_URL}/campaigns/${title}/actions/unschedule`;
    const schemaUrl = `${BASE_API_URL}/campaigns/schema/schedule`;

    const onSubmitted = (response) => {
        setSchdeuleStatus(`Success!`);
        setRenderTimestamp(+new Date());
    };

    const onClickDetach = () => {
        setShowDetachModal(true);
    };

    const onDetach = (performAction) => () => {
        performAction().then(() => {
            setShowDetachModal(false);
            setRenderTimestamp(+new Date());
        });
    };

    return (
        <PageTemplate
            breadcrumb={<Link to={`/campaigns/${title}`} component={RouterLink}>&lsaquo; {title}</Link>}
            title={`Schedule Campaign "${title}"`}
            navItems={[]}
            sideNavItems={[
                <SideNavItem>
                    <Link to="/" component={RouterLink}>Home</Link>
                </SideNavItem>,
                <SideNavItem>
                    <Link to="/campaigns/create" component={RouterLink}>Create Campaign</Link>
                </SideNavItem>
            ]}
        >
            <UnscheduleCampaignContainer actionUrl={unscheduleUrl}>
                {({ performing, error, performAction }) => (
                    <UnscheduleCampaignModal
                        open={showDetachModal}
                        loading={performing}
                        error={error}
                        onDelete={onDetach(performAction)}
                        onClose={() => setShowDetachModal(false)}
                    />
                )}
            </UnscheduleCampaignContainer>
            <CreateEditCampaignController
                key={renderTimestamp}
                dataUrl={dataUrl}
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
                            {formData.mailchimpId && (
                                <Card>
                                    <CardBody>
                                        <ButtonSet>
                                            <Button type="danger" onClick={onClickDetach}>
                                                Detach from Mailchimp
                                            </Button>
                                        </ButtonSet>
                                    </CardBody>
                                </Card>
                            )}
                            <Card>
                                <CardBody>
                                    {schdeuleStatus && (
                                        <Notification type="success">
                                            {schdeuleStatus}
                                        </Notification>
                                    )}
                                    {error && (
                                        <Notification type="danger" variant="block">
                                            {String(error)}
                                        </Notification>
                                    )} 

                                    {!formData.mailchimpId && (
                                        <Badge>
                                            Unscheduled
                                            </Badge>
                                    )}
                                    {formData.mailchimpId && (
                                        <a href={formData.mailchimpUrl} target="_blank" rel="noopener noreferrer">
                                            <Badge type="success">
                                                Scheduled in Mailchimp
                                                </Badge>
                                        </a>
                                    )}

                                    <FormFromSchema
                                        schema={schema}
                                        uiSchema={uiSchema}
                                        formData={formData}
                                        onSubmit={onSubmit}
                                        submitting={submitting}
                                    />
                                </CardBody>
                            </Card>
                        </Fragment>
                    );
                }}
            </CreateEditCampaignController>
        </PageTemplate>
    );
}

export default ScheduleCampaign;

import React, { Fragment, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import Link, { LinkButton } from '@clarityhub/unity-web/lib/components/Link';
import PageTemplate from '@clarityhub/unity-web/lib/templates/PageTemplate';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { SideNavItem } from '@clarityhub/unity-web/lib/components/SideNav';
import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import Loading from '@clarityhub/unity-web/lib/components/Loading/Loading';
import Badge from '@clarityhub/unity-web/lib/components/Badge';
import FormFromSchema from '@clarityhub/unity-forms/lib/FormFromSchema';

import DeleteCampaignModal from '../components/DeleteCampaignModal';
import UnscheduleCampaignModal from '../components/UnscheduleCampaignModal';
import CreateEditCampaignContainer from '../containers/CreateEditCampaign';
import DeleteCampaignContainer from '../containers/DeleteCampaign';
import UnscheduleCampaignContainer from '../containers/UnscheduleCampaign';

import { BASE_API_URL } from '../../config';

const uiSchema = {
    blogPosts: {
        items: {
            description: {
                'ui:widget': 'textarea',
            },
        },
    },
    issues: {
        items: {
            body: {
                'ui:widget': 'textarea',
            },
        },
    },
};

// XXX refactor page template with other pages

const EditCampaign = ({ history, match }) => {
    const [renderTimestamp, setRenderTimestamp] = useState(+new Date());
    const [redirectTo, setRedirectTo] = useState(null);
    const [editStatus, setEditStatus] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetachModal, setShowDetachModal] = useState(false);

    const { params: { title } } = match;
    
    const dataUrl = `${BASE_API_URL}/campaigns/${title}`;
    const submitMethod = 'PUT';
    const submitUrl = `${BASE_API_URL}/campaigns/${title}`;
    const schemaUrl = `${BASE_API_URL}/campaigns/schema/update`;
    const unscheduleUrl = `${BASE_API_URL}/campaigns/${title}/actions/unschedule`;

    const onSubmitted = () => {
        setEditStatus(`Success!`);
        setRenderTimestamp(+new Date());
    };

    const onClickDelete = () => {
        setShowDeleteModal(true);
    };

    const onDelete = (performAction) => () => {
        performAction().then(() => {
            setRedirectTo(`/`);
        });
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

    if (redirectTo) {
        return <Redirect to={redirectTo} />;
    }

    return (
        <PageTemplate
            breadcrumb={<Link to="/" component={RouterLink}>&lsaquo; Campaigns</Link>}
            title="Edit Campaign"
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
            <DeleteCampaignContainer actionUrl={submitUrl}>
                {({ performing, error, performAction }) => (
                    <DeleteCampaignModal
                        open={showDeleteModal}
                        loading={performing}
                        error={error}
                        onDelete={onDelete(performAction)}
                        onClose={() => setShowDeleteModal(false)}
                    />
                )}
            </DeleteCampaignContainer>
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

            <CreateEditCampaignContainer
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
                            <Card>
                                <CardBody>
                                    <ButtonSet>
                                        <Button
                                            component="a"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            href={`/campaigns/${title}/preview`}
                                            >
                                            Preview
                                        </Button>
                                        <LinkButton type="primary" to={`/campaigns/${title}/schedule`} history={history}>
                                            Schedule
                                        </LinkButton>
                                        <Button type="danger" onClick={onClickDelete}>Delete</Button>
                                        {formData.mailchimpId && (
                                            <Button type="danger" onClick={onClickDetach}>
                                                Detach from Mailchimp
                                            </Button>
                                        )}
                                    </ButtonSet>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    {editStatus && (
                                        <Notification type="success">
                                            {editStatus}
                                        </Notification>
                                    )}
                            
                                    <Fragment>
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
                                    </Fragment>
                                </CardBody>
                            </Card>
                        </Fragment>
                    );
                }}
            </CreateEditCampaignContainer>
        </PageTemplate>
    );
}

export default EditCampaign;

import React, { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Badge from '@clarityhub/unity-web/lib/components/Badge';
import Loading from '@clarityhub/unity-web/lib/components/Loading';
import Link from '@clarityhub/unity-web/lib/components/Link';
import Button from '@clarityhub/unity-web/lib/components/Buttons';
import PageTemplate from '@clarityhub/unity-web/lib/templates/PageTemplate';
import Card, { CardBody } from '@clarityhub/unity-web/lib/components/Card';
import { SideNavItem } from '@clarityhub/unity-web/lib/components/SideNav';
import Notification from '@clarityhub/unity-web/lib/components/Notification';

import GridFromJSONAPI from '../components/GridFromJSONAPI';
import DeleteCampaignModal from '../components/DeleteCampaignModal';
import ViewCampaignsContainer from '../containers/ViewCampaigns';
import DeleteCampaignContainer from '../containers/DeleteCampaign';
import { BASE_API_URL } from '../../config';
import { LinkButton } from '@clarityhub/unity-web/lib/components/Link';

const columns = [
    ['Title', 'title'],
    ['Subject Line', 'subjectLine'],
    ['Preview Text', 'previewText'],
    ['Status', (data) => {
        if (data.mailchimpId) {
            return (
                <Badge type="success">
                    Scheduled
                </Badge>
            );
        } else {
            return (
                <Badge>
                    Unscheduled
                </Badge>
            );
        }
    }],
];

const CreateEditCampaignPage = ({ history }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const dataUrl = `${BASE_API_URL}/campaigns`;

    const onClickDelete = () => {
        setShowDeleteModal(true);
    };

    const onDelete = (performAction, refresh) => () => {
        performAction().then(() => {
            setShowDeleteModal(false);
            refresh();
        });
    }

    return (
        <PageTemplate
            title="Campaigns"
            navItems={[]}
            /* XXX share page template props */
            sideNavItems={[
                <SideNavItem selected>
                    <Link to="/" component={RouterLink}>Home</Link>
                </SideNavItem>,
                <SideNavItem>
                    <Link to="/campaigns/create" component={RouterLink}>Create Campaign</Link>
                </SideNavItem>
            ]}
        >
            <Card>
                <CardBody>
                    <LinkButton history={history} to="/campaigns/create" type="primary">Create Campaign</LinkButton>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <ViewCampaignsContainer
                        dataUrl={dataUrl}
                    >
                        {({ loading, loaded, error, data, refresh }) => {
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

                                    <GridFromJSONAPI
                                        data={data}
                                        columns={columns}
                                        actionColumn={({ row }) => {
                                            // XXX this url shouldn't really be here
                                            const actionUrl = `${BASE_API_URL}/campaigns/${row.title}`;

                                            return (
                                                <div style={{ minWidth: '200px' }}>
                                                    <RouterLink
                                                        to={`/campaigns/${row.title}`}
                                                    >
                                                        <Button
                                                            size="small"
                                                            type="primary"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </RouterLink>

                                                    <DeleteCampaignContainer actionUrl={actionUrl}>
                                                        {({ performing, error, performAction }) => (
                                                            <DeleteCampaignModal
                                                                open={showDeleteModal}
                                                                loading={performing}
                                                                error={error}
                                                                onDelete={onDelete(performAction, refresh)}
                                                                onClose={() => setShowDeleteModal(false)}
                                                            />
                                                        )}
                                                    </DeleteCampaignContainer>
                                                    <Button size="small" type="danger" text onClick={onClickDelete}>Delete</Button>
                                                </div>
                                            );
                                        }}
                                    />
                                </Fragment>
                            );
                        }}
                    </ViewCampaignsContainer>
                </CardBody>
            </Card>
        </PageTemplate>
    );
}

export default CreateEditCampaignPage;

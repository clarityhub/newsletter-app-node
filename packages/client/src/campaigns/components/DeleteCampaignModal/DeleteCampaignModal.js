import React from 'react';

import Notification from '@clarityhub/unity-web/lib/components/Notification';
import Modal from '@clarityhub/unity-web/lib/components/Modals';
import Typography from '@clarityhub/unity-web/lib/components/Typography';
import Button, { ButtonSet } from '@clarityhub/unity-web/lib/components/Buttons';
import { CardBody, CardActions } from '@clarityhub/unity-web/lib/components/Card';

const DeleteCampaignModal = ({ open, loading, error, onDelete, onClose }) => (
    <Modal open={open} onClose={onClose}>
        <CardBody>
            <Typography type="h3">Delete Campaign</Typography>
            <Typography type="text">Are you sure?</Typography>

            {error && (
                <Notification type="danger">
                    {String(error)}
                </Notification>
            )}

            <CardActions>
                <ButtonSet>
                    <Button text onClick={onClose}>
                        Close
                  </Button>
                    <Button
                        type="danger"
                        loading={loading}
                        disabled={loading}
                        onClick={onDelete}
                    >
                        Delete
                  </Button>
                </ButtonSet>
            </CardActions>
        </CardBody>
    </Modal>
);

export default DeleteCampaignModal;

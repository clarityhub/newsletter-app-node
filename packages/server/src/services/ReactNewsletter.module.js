import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { MjmlSection, MjmlImage } from 'mjml-react';

import colors from '@clarityhub/unity-core/lib/colors';

import MJMLRenderer from '@clarityhub/unity-email/lib/renderers/MJMLRenderer';
import EmailTemplate from '@clarityhub/unity-email/lib/templates/EmailTemplate';
import { GraySection, WhiteSection } from '@clarityhub/unity-email/lib/components/Sections';
import Box from '@clarityhub/unity-email/lib/components/Box';
import Column from '@clarityhub/unity-email/lib/components/Column';
import Divider from '@clarityhub/unity-email/lib/components/Divider';
import ClarityHubLogo from '@clarityhub/unity-email/lib/components/ClarityHubLogo';
import Typography from '@clarityhub/unity-email/lib/components/Typography';
import Link from '@clarityhub/unity-email/lib/components/Link';
import Button from '@clarityhub/unity-email/lib/components/Button';
import Footer from '@clarityhub/unity-email/lib/components/Footer';
import Emojify from '@clarityhub/unity-email/lib/components/Emojify';

const renderer = new MJMLRenderer();

const Code = ({ value, ...rest }) => (
    <table border="0" cellSpacing="0" width="100%">
        <tr>
            <td></td>
            <td width="350">
                <pre style={{ width: '600px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    <code>
                        {value}
                    </code>
                </pre>
            </td>
            <td></td>
        </tr>
    </table> 
);

const InlineCode = ({ value }) => (
    <Fragment>
        &nbsp;
        <code>
            {value}
        </code>
        &nbsp;
    </Fragment>
);

const Emphasis = (props) => (
    <Fragment>
        &nbsp;
        <em {...props} />
        &nbsp;
    </Fragment>
);

const Strong = (props) => (
    <Fragment>
        &nbsp;
        <strong {...props} />
        &nbsp;
    </Fragment>
);

const MarkdownLink = (props) => (
    <Fragment>
        &nbsp;
        <Link {...props} />
        &nbsp;
    </Fragment>
);

module.exports = {
    render(data) {
        const buttonText = ['Help Out', 'Contribute', 'Pitch In', 'Commit', 'Fix It', 'Check It Out'];

        const { html } = renderer.render(
            <EmailTemplate
                title="*|MC:SUBJECT|*"
                preview={data.previewText}
            >
            	<MjmlSection
                    fullWidth
                    backgroundColor={colors.notification.default}
                >
                    <Column>
                        <Box marginTop={0.1} marginBottom={0.1}>
                            <ClarityHubLogo width="260px" />
                        </Box>
                    </Column>
                </MjmlSection>
                <GraySection>
                    <Column>
                        <Box marginTop={2} marginBottom={2}>
                            <Box>
                                <Typography center type="h1">
                                    Stellar Newsletter
                                </Typography>
                                <Typography center type="h3">
                                    By Clarity Hub
                                </Typography>
        
                                <Typography center type="text">
                                    Your weekly dose of hot open-source issues that you can contribute to and programming blog posts!
                                </Typography>
                                {data.greeting && (
                                    <Typography center type="text">
                                        {data.greeting}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Column>
                </GraySection>

                {
                    data.blogPosts && data.blogPosts.length > 0 && (
                        <Fragment>
                            <WhiteSection>
                                <Column>
                                    <Box marginTop={2} marginBottom={1}>
                                        <Typography type="h2" center>
                                            What's New
                                        </Typography>
                                    </Box>
                                </Column>
                            </WhiteSection>
                            {
                                data.blogPosts.map((post, index) => (
                                    <WhiteSection key={index}>
                                        <Column width="40%" verticalAlign="middle">
                                            <MjmlImage src={post.image} align="center" />
                                        </Column>
                                        <Column>
                                            <Box marginBottom={2}>
                                                <Typography type="h3">
                                                    {post.title}
                                                </Typography>
                                                <Typography type="text">
                                                    {post.description}
                                                </Typography>

                                                <Button href={post.url} type="primary">
                                                    Read More
                                                </Button>
                                            </Box>
                                        </Column>
                                    </WhiteSection>
                                ))
                            }
                            <WhiteSection>
                                <Column>
                                    <Box marginBottom={1}>
                                    </Box>
                                </Column>
                            </WhiteSection>
                        </Fragment>
                    )
                }
        

                <WhiteSection>
                    <Column>
                        <Box marginTop={2} marginBottom={1}>
                            <Typography type="h2" center>
                                Hot Open Source Issues
                            </Typography>
                        </Box>
                    </Column>
                </WhiteSection>
                <WhiteSection>
                    <Column>
                        <Box marginBottom={1}>
                            {
                                data.issues.map((issue, index) => (
                                    <Box marginBottom={3} key={index}>
                                        <Typography type="h3">
                                            {issue.title} <i>in {issue.repo.name}</i>
                                        </Typography>
                                        <Typography type="text">
                                            <ReactMarkdown
                                                source={issue.body}
                                                renderers={{
                                                    text: (props) => <Typography type="p" {...props} />,
                                                    code: Code,
                                                    inlineCode: InlineCode,
                                                    emphasis: Emphasis,
                                                    strong: Strong,
                                                    link: MarkdownLink,
                                                }}
                                            />
                                        </Typography>
                                        <Box>
                                            <Typography center type="text">
                                                <i><b>{issue.repo.name}</b> – <Emojify>{issue.repo.description}</Emojify></i>
                                            </Typography>
                                        </Box>
                                        <Button center href={issue.html_url} type="primary">
                                            {buttonText[index%buttonText.length]}
                                        </Button>
                                    </Box>
                                ))
                            }
                            {/* END ITEM */}
                            <Divider />
        
                            <Box>
                                <Typography center type="subtext">
                                    If you have any feedback or want to get in touch, just hit reply. We'll get back to you as soon as we can.
                                </Typography>
                            </Box>
                        </Box>
                    </Column>
                </WhiteSection>
        
                <Footer />
            </EmailTemplate>
        );

        return html;
    }
}


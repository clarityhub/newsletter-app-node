"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _mjmlReact = require("mjml-react");

var _colors = _interopRequireDefault(require("@clarityhub/unity-core/lib/colors"));

var _MJMLRenderer = _interopRequireDefault(require("@clarityhub/unity-email/lib/renderers/MJMLRenderer"));

var _EmailTemplate = _interopRequireDefault(require("@clarityhub/unity-email/lib/templates/EmailTemplate"));

var _Sections = require("@clarityhub/unity-email/lib/components/Sections");

var _Box = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Box"));

var _Column = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Column"));

var _Divider = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Divider"));

var _ClarityHubLogo = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/ClarityHubLogo"));

var _Typography = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Typography"));

var _Link = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Link"));

var _Button = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Button"));

var _Footer = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Footer"));

var _Emojify = _interopRequireDefault(require("@clarityhub/unity-email/lib/components/Emojify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var renderer = new _MJMLRenderer.default();

var Code = function Code(_ref) {
  var value = _ref.value,
      rest = _objectWithoutProperties(_ref, ["value"]);

  return _react.default.createElement("table", {
    border: "0",
    cellSpacing: "0",
    width: "100%"
  }, _react.default.createElement("tr", null, _react.default.createElement("td", null), _react.default.createElement("td", {
    width: "350"
  }, _react.default.createElement("pre", {
    style: {
      width: '600px',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    }
  }, _react.default.createElement("code", null, value))), _react.default.createElement("td", null)));
};

var InlineCode = function InlineCode(_ref2) {
  var value = _ref2.value;
  return _react.default.createElement(_react.Fragment, null, "\xA0", _react.default.createElement("code", null, value), "\xA0");
};

var Emphasis = function Emphasis(props) {
  return _react.default.createElement(_react.Fragment, null, "\xA0", _react.default.createElement("em", props), "\xA0");
};

var Strong = function Strong(props) {
  return _react.default.createElement(_react.Fragment, null, "\xA0", _react.default.createElement("strong", props), "\xA0");
};

var MarkdownLink = function MarkdownLink(props) {
  return _react.default.createElement(_react.Fragment, null, "\xA0", _react.default.createElement(_Link.default, props), "\xA0");
};

module.exports = {
  render: function render(data) {
    var buttonText = ['Help Out', 'Contribute', 'Pitch In', 'Commit', 'Fix It', 'Check It Out'];

    var _renderer$render = renderer.render(_react.default.createElement(_EmailTemplate.default, {
      title: "*|MC:SUBJECT|*",
      preview: data.previewText
    }, _react.default.createElement(_mjmlReact.MjmlSection, {
      fullWidth: true,
      backgroundColor: _colors.default.notification.default
    }, _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
      marginTop: 0.1,
      marginBottom: 0.1
    }, _react.default.createElement(_ClarityHubLogo.default, {
      width: "260px"
    })))), _react.default.createElement(_Sections.GraySection, null, _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
      marginTop: 2,
      marginBottom: 2
    }, _react.default.createElement(_Box.default, null, _react.default.createElement(_Typography.default, {
      center: true,
      type: "h1"
    }, "Stellar Newsletter"), _react.default.createElement(_Typography.default, {
      center: true,
      type: "h3"
    }, "By Clarity Hub"), _react.default.createElement(_Typography.default, {
      center: true,
      type: "text"
    }, "Your weekly dose of hot open-source issues that you can contribute to and programming blog posts!"), data.greeting && _react.default.createElement(_Typography.default, {
      center: true,
      type: "text"
    }, data.greeting))))), _react.default.createElement(_Sections.WhiteSection, null, _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
      marginTop: 2,
      marginBottom: 1
    }, _react.default.createElement(_Typography.default, {
      type: "h2",
      center: true
    }, "Latest Blog Posts")))), data.blogPosts.map(function (post, index) {
      return _react.default.createElement(_Sections.WhiteSection, {
        key: index
      }, _react.default.createElement(_Column.default, {
        width: "40%",
        verticalAlign: "middle"
      }, _react.default.createElement(_mjmlReact.MjmlImage, {
        src: post.image,
        align: "center"
      })), _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
        marginBottom: 2
      }, _react.default.createElement(_Typography.default, {
        type: "h3"
      }, post.title), _react.default.createElement(_Typography.default, {
        type: "text"
      }, post.description), _react.default.createElement(_Button.default, {
        href: post.url,
        type: "primary"
      }, "Read More"))));
    }), _react.default.createElement(_Sections.WhiteSection, null, _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
      marginBottom: 1
    }))), _react.default.createElement(_Sections.WhiteSection, null, _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
      marginTop: 2,
      marginBottom: 1
    }, _react.default.createElement(_Typography.default, {
      type: "h2",
      center: true
    }, "Hot Open Source Issues")))), _react.default.createElement(_Sections.WhiteSection, null, _react.default.createElement(_Column.default, null, _react.default.createElement(_Box.default, {
      marginBottom: 1
    }, data.issues.map(function (issue, index) {
      return _react.default.createElement(_Box.default, {
        marginBottom: 3,
        key: index
      }, _react.default.createElement(_Typography.default, {
        type: "h3"
      }, issue.title, " ", _react.default.createElement("i", null, "in ", issue.repo.name)), _react.default.createElement(_Typography.default, {
        type: "text"
      }, _react.default.createElement(_reactMarkdown.default, {
        source: issue.body,
        renderers: {
          text: function text(props) {
            return _react.default.createElement(_Typography.default, _extends({
              type: "p"
            }, props));
          },
          code: Code,
          inlineCode: InlineCode,
          emphasis: Emphasis,
          strong: Strong,
          link: MarkdownLink
        }
      })), _react.default.createElement(_Box.default, null, _react.default.createElement(_Typography.default, {
        center: true,
        type: "text"
      }, _react.default.createElement("i", null, _react.default.createElement("b", null, issue.repo.name), " \u2013 ", _react.default.createElement(_Emojify.default, null, issue.repo.description)))), _react.default.createElement(_Button.default, {
        center: true,
        href: issue.html_url,
        type: "primary"
      }, buttonText[index % buttonText.length]));
    }), _react.default.createElement(_Divider.default, null), _react.default.createElement(_Box.default, null, _react.default.createElement(_Typography.default, {
      center: true,
      type: "subtext"
    }, "If you have any feedback or want to get in touch, just hit reply. We'll get back to you as soon as we can."))))), _react.default.createElement(_Footer.default, null))),
        html = _renderer$render.html;

    return html;
  }
};

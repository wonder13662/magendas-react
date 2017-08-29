import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DevCardView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // isDisable:false
        };
    }

    drawDescList(descList) {
        // 주의! key값 지정 필요. key는 Array 안에서 지정되어야 합니다.
        const listItems = descList.map((desc, index) => {

            const descList = desc.split("</code>");
            let item =
            descList.map((element, index) => {
                const portionHasCode = element.split("<code>");
                if(portionHasCode.length === 2) {
                    // <code></code>의 쌍을 찾았습니다.
                    return <span key={"code_" + index}>{portionHasCode[0]}<code>{portionHasCode[1]}</code></span>;
                }
                return <span key={"code_" + index}>{portionHasCode[0]}</span>;
            });

            return <li key={"desc_" + index}>{item}</li>;
        });
        return <ul className="no-bullet">{listItems}</ul>;
    }

    render() {

        return (
            <div>
                <h3 id="small-text">
                    <a  className="anchorjs-link "
                        href="#small-text"
                        aria-label="Anchor link for: small text"/>
                    {this.props.name}
                </h3>
                {this.drawDescList(this.props.desc)}
                <div className="bs-example" data-example-id="simple-small">
                    {this.props.component}
                </div>
                <figure className="highlight">
                <pre>
                    <code className="language-html" data-lang="html">
                        {this.props.code}
                    </code>
                </pre>
                </figure>
            </div>
        );
    }
}

export default DevCardView;

DevCardView.propTypes = {
    desc: PropTypes.arrayOf(PropTypes.string),
    code: PropTypes.object
};

DevCardView.defaultProps = {
    desc: [],
    code: null
};
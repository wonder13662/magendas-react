import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'style-loader!Component/common/label/file-label.less';

class FileLabel extends Component {

    constructor(props) {
        super(props);

        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickRemove(event) {
        event.stopPropagation();
        event.preventDefault();

        // TODO : confirm을 확인 모달로 변경할 것.
        if(this.props.onRemoveFile) {
            this.props.onRemoveFile();
        }
    }

    render() {
        return (
            <label
                className={"swv-file-label " + this.props.className}
                ref={label => this.fileLabel = label}
                style={this.props.style}
			>
                {this.props.filePreviewLink &&
                <a
                    className={"contain-icon icon-container"}
                    target={"_blank"}
                    href={this.props.filePreviewLink}>
                    {this.props.fileName}
                </a>
                }

                {this.props.fileDownloadLink &&
                <a
                    className={"icon-download icon-container"}
                    target={"_blank"}
                    href={this.props.fileDownloadLink}>
                    <i className="fa fa-download fa-1"></i>
                </a>
                }

                {this.props.onRemoveFile &&
                <a
                    className={"icon-remove icon-container"}
                    target={"_blank"}
                    onClick={this.onClickRemove}
                    href={"#"}>
                    <i className="fa fa-times fa-1" onClick={this.onClickRemove}/>
                </a>
                }


            </label>
        );
    }
}

FileLabel.defaultProps = {
    fileName:"No file name",
    fileSize:0,
    onRemoveFile:null,
    filePreviewLink:"",
    fileDownloadLink:"",
    style:{},
	className: ""
};

FileLabel.propTypes = {
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
    onRemoveFile: PropTypes.func,
    filePreviewLink: PropTypes.string,
    fileDownloadLink: PropTypes.string,
    style: PropTypes.object,
	className: PropTypes.string
};

export default FileLabel;
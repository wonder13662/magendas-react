import React, { Component } from 'react';
import FileLabel from 'Component/common/label/FileLabel';
import DevCardView from 'DevPage/common/DevCardView';
import 'style-loader!font-awesome/less/font-awesome.less';

class FileLabelCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDisableBtn:false
        };

        this.onRemoveFile = this.onRemoveFile.bind(this);
    }

    onRemoveFile(param) {
        // alert("onRemoveFile");
    }

    render() {
        return (
            <DevCardView
                name={"FileLabel | FileLabelCard.js"}
                desc={[
                    "<code>fileName</code> file name.",
                    "<code>fileSize</code> file size. kb(kilo byte).",
                    "<code>onRemoveFile</code> callback function after file-remove button clicked.",
                    "<code>filePreviewLink</code> link url which shows file contents on browser.",
                    "<code>fileDownloadLink</code> link url which can download file.",
                    "<code>style</code> CSS style applied to Label container.",
                ]}
                component={
                    <div>
                        <FileLabel
                            fileName={"FileToDelete.txt"}
                            fileSize={200}
                            filePreviewLink={"http://myapp.com"}
                            onRemoveFile={this.onRemoveFile}
                            fileDownloadLink={null}
                            style={{}}
                        />
                        <FileLabel
                            fileName={"FileToDownload.txt"}
                            fileSize={200}
                            filePreviewLink={"http://myapp.com"}
                            onRemoveFile={null}
                            fileDownloadLink={"http://myapp.com"}
                            style={{marginLeft:"10px"}}
                        />
                        <FileLabel
                            fileName={"FileToDownloadNDelete.txt"}
                            fileSize={200}
                            filePreviewLink={"http://myapp.com"}
                            onRemoveFile={this.onRemoveFile}
                            fileDownloadLink={"http://myapp.com"}
                            style={{marginLeft:"10px"}}
                        />
                    </div>
                }
                code={
                    <div>
                        <div className="nt">&lt;FileLabel</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileName=&#123;&#34;FileToDelete.txt&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileSize=&#123;200&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;filePreviewLink=&#123;&#34;http://myapp.com&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onRemoveFile=&#123;this.onRemoveFile&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileDownloadLink=&#123;&#34;null&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;&#125;&#125;</div>
                        <div className="nt">/&gt;</div>
                        <div className="nt">&lt;FileLabel</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileName=&#123;&#34;FileToDownload.txt&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileSize=&#123;200&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;filePreviewLink=&#123;&#34;http://myapp.com&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onRemoveFile=&#123;null&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileDownloadLink=&#123;&#34;https://myapp.com&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;marginLeft:&#34;10px&#34;&#125;&#125;</div>
                        <div className="nt">/&gt;</div>
                        <div className="nt">&lt;FileLabel</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileName=&#123;&#34;FileToDownloadNDelete.txt&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileSize=&#123;200&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;filePreviewLink=&#123;&#34;http://myapp.com&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;onRemoveFile=&#123;this.onRemoveFile&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;fileDownloadLink=&#123;&#34;https://myapp.com&#34;&#125;</div>
                        <div className="nn">&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123;marginLeft:&#34;10px&#34;&#125;&#125;</div>
                        <div className="nt">/&gt;</div>

                    </div>
                }
            />
        );
    }
}

export default FileLabelCard;
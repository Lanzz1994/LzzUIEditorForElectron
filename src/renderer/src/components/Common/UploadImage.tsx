import React from 'react';
import { Upload, Icon } from 'antd';
import { getBase64 } from '@/utils/ImageUtils'

interface UploadImageProps{
    uploadProps:any,
    uploadTitle:string
}

export default class UploadImage extends React.PureComponent<UploadImageProps> {
    state = {
        loading: false,
        imageUrl:''
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
        }
        if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
        }));
        }
    }

    render() {
        let {uploadProps,uploadTitle}=this.props;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{uploadTitle||'上传'}</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
        <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            onChange={this.handleChange}
            {...uploadProps}
        >
            {imageUrl ? <img src={imageUrl} style={{width:'100%'}}/> : uploadButton}
        </Upload>
        );
    }
}
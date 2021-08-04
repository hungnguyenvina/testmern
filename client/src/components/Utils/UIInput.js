import React from 'react';
import { Form,Input,Select, Upload,Button } from "element-react"
import CKEditor from "react-ckeditor-component";

class UIInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    switch(this.props.elementType) {
        case 'input':
            if(this.props.elementConfig.type == "file") {
                return (
                    <Form.Item label={this.props.label} labelWidth="120">
                    <Upload
                        name={this.props.name}
                        className="upload-demo"
                        action={this.props.action}
                        onPreview={this.props.onPreview}
                        onRemove={this.props.onRemove}
                        onChange={this.props.onChange}
                        fileList={this.props.fileList}
                        istType="picture"
                        
                    >
                        <Button size="small" type="primary">Click to upload</Button>
                    </Upload>
                    </Form.Item>
                )
            }
            else if(this.props.elementConfig.type == "ckeditor") {
                return (
                    <Form.Item label={this.props.label} labelWidth="120">
                        <CKEditor 
                            activeClass="p10" 
                            content={this.props.content} 
                            events={{
                                "change": this.props.onChangeCKEditor
                        }}
                        />
                    </Form.Item>
                )
            }
            else {
                return (
                    <Form.Item label={this.props.label} labelWidth="120">
                        <Input placeholder={this.props.elementConfig.placeholder} value={this.props.value} onChange={this.props.onChange}></Input>
                    </Form.Item>
                )
            }
        case 'select':
            return (
                <Form.Item label={this.props.label} labelWidth="120">
                    <Select 
                        value={this.props.elementConfig.defaultOption.value} 
                        placeholder={this.props.elementConfig.placeholder}
                        onChange={this.props.onChange}
                    >
                        {this.props.elementConfig.options.map(item =>{
                            return  <Select.Option key={item.value} label={item.displayValue} value={item.value}></Select.Option>
                        })}
                    </Select>
                </Form.Item>
            )
        default: 
            return (
                <Form.Item label={this.props.label} labelWidth="120">
                    <Input placeholder={this.props.elementConfig.placeholder} value={this.props.value} onChange={this.props.onChange}></Input>
                </Form.Item>
            )
    }
}
}


export default UIInput;


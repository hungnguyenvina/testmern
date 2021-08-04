import {
    Table,
    Icon,
    Tag,
    Button,
    Loading,
    Pagination,
    Dialog,
    Form,
    Checkbox,
    Radio,
    Switch,
    TimePicker,
    Input,
    Select,
    Layout,
    DatePicker,
    Upload
  } from "element-react";
import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import InstructorLayout from "./InstructorLayout";
import { connect } from "react-redux";
import { updateCourseInfo,getCourseById } from "../../redux/actions/courseAction";
import { loadCourseCategories } from "../../redux/actions/courseCategoryAction";
import  UIInput  from "../Utils/UIInput";
import LessionCss from './Lession.css';
import {post} from 'axios';

class Lession extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      //lession_type: 0
      display_component:true,
      content: '',
      display_lession_title_input:false,
      lessionContent : {
        lession_index: 0,
        lession_type: 0, /* 0: lession's content is text, 1: video url */
        lession_title: '',
        lession_content:''                
      },
    };

    this.onChange = this.onChange.bind(this);
  }

  

  onChange(evt){
    //console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    //alert('this.props.lession_index,,,,,, : '+this.props.lession_index);
    //alert('newContent,,,,,, : '+newContent);
    this.setState({content: newContent});
    const lessionContent = {
        lession_index: this.props.lession_index,
        lession_type: this.state.lessionContent.lession_type, /* 0: lession's content is text, 1: video url */
        lession_content:newContent,
        lession_title: this.state.lessionContent.lession_title
    }
    const sectionIndex = this.props.id;
    //alert('sectionIndex:'+sectionIndex);
    this.setState({lessionContent});
    this.props.onLessionChange(sectionIndex,lessionContent);
}

  componentWillMount() {
//alert(this.props.lession_type);
    const lessionContent = {
        lession_index: this.props.lession_index,
        lession_type: this.props.lession_type, /* 0: lession's content is text, 1: video url */
        lession_content:this.props.lession_content,
        lession_title: this.props.lession_title
    }

    this.setState({ lessionContent });
}

  componentDidMount() {
    //const courseId = this.props.match.params.id;
    //this.props.loadCourseInfo(courseId);
  }

  componentWillReceiveProps(nextProps) {
		
  }
  
  showChangeLessionTitle = () => {
    this.setState({
        display_lession_title_input: !this.state.display_lession_title_input
    })
}

saveChangeLessionTitle = () => {
    this.setState({
        display_lession_title_input: !this.state.display_lession_title_input
    })
    //console.log('save new lesstion title/......');
    //console.log(this.state.lessionContent);
    const sectionIndex = this.props.section_index;
    //alert('section index='+sectionIndex);
    this.props.onLessionChange(sectionIndex,this.state.lessionContent);
}

changeLessionTitle = (value) => {
  let lessionContent = {...this.state.lessionContent };
  lessionContent['lession_title'] = value;
  //console.log(value);
  this.setState({lessionContent});
}

  deleteLession = () => {

  }

  showHideLessionContent = () => {
    this.setState({
      display_component: !this.state.display_component
    })
  }

  chooseLessionContentType = function(e)  {
    alert('choose lession text type='+ e.target.value);
    let lessionType = e.target.value=='text'?0:1;
    //this.setState({display_lession_video: 1});
    //alert('this.state.lessionContent.lession_title:'+this.state.lessionContent.lession_title);
    const lessionContent = {
        lession_index: this.state.lessionContent.lession_index,
        lession_type: lessionType, /* 0: lession's content is text, 1: video url */
        lession_content:this.state.content,
        lession_title:this.state.lessionContent.lession_title
    }
    this.setState({
      lessionContent: lessionContent
      
    });
    //const sectionIndex = this.props.id;
    //alert('sectionIndex:'+sectionIndex);
    //this.setState({lessionContent});
    //this.props.onLessionChange(sectionIndex,lessionContent);
}

handleChange = (file, fileList) => {
  //alert('on changexx');
  //console.log(file);
  //console.log(fileList);
  //console.log('file name: '+file.raw.name);
  //console.log(file.raw);
  this.createImage(file.raw);
}

createImage(file) {
  //alert('create image');
  let reader = new FileReader();
  reader.onload = (e) => {
//console.log('picture result');
//console.log(e.target.result);
    this.setState({image: e.target.result })
    this.fileUpload(e.target.result,file.name);
  };
  reader.readAsDataURL(file);
}

fileUpload(image,fileName){
  //console.log('file upload');
  //console.log(image);
  const url = 'http://localhost:3004/api/upload_file';
      //const formData = {file: image,filename:fileName}
      const formData = {file: image,filename:fileName}
  return  post(url, formData)
      .then(response => {
                      let media = ""; 
                      //console.log('file response....'+ response);
                      //console.log( response);
            //console.log('file response....'+ this.state.image);
                      let urlResponse = response.data.url;
                      alert('urlResponse : '+urlResponse);
                      var indexMP4 = urlResponse.endsWith("mp4");
                      var indexWEBMV = urlResponse.endsWith("webm");
                      var indexOGV = urlResponse.endsWith("ogv");
                      if(indexMP4 > 0)
                      {
                          media = 
                          {
                              // sources: {ogv: 'http://techslides.com/demos/sample-videos/small.ogv'},
                              sources: {
                                  m4v: urlResponse
                              }, 
                              title: null,
                              artist: null,
                              poster: null,
                              free: false,
                              tracks: [],
                          };
                      }
                      
                      if(indexWEBMV > 0)
                      {
                          media = 
                          {
                              sources: {
                                  webmv: urlResponse
                              }, 
                              title: null,
                              artist: null,
                              poster: null,
                              free: false,
                              tracks: [],
                          };
                      }

                      if(indexOGV > 0)
                      {
                          media = 
                          {
                              sources: {
                                  ogv: urlResponse
                              }, 
                              title: null,
                              artist: null,
                              poster: null,
                              free: false,
                              tracks: [],
                          };
                      }

                      //alert('this.props.id : '+this.props.id);
                      //console.log('media : '+media);
                      //this.props.setMedia('jplayer_'+this.props.id, media);
                      //alert('video url:'+response.data.content);
                      //alert('this.props.lession_index:'+this.props.lession_index);
                      //alert('this.props.lession_title:'+this.props.lession_title);
                      //alert('this.state.lessionContent.lession_title:'+this.state.lessionContent.lession_title);
                      const lessionContent = {
                          lession_index: this.props.lession_index,
                          lession_type: 1, /* 0: lession's content is text, 1: video url */
                          lession_content:response.data.url,
                          lession_title: this.state.lessionContent.lession_title
                      }
                      this.setState({lessionContent});
                      const sectionIndex =this.props.section_index;
                      //alert('sectionIndex: '+sectionIndex);
                      this.props.onLessionChange(sectionIndex,lessionContent);
                      //this.setState({image: response.data.url});
                  }
      )
  }

  render() {
    const fileList2 = [];
    return (
    
        <div className="lession">
          <div style={{display:this.state.display_lession_title_input==false?'inline-block':'none'}}>
                    <label  className="lblSectionTitle">{this.state.lessionContent.lession_title} </label>
                    <Button style={{marginBottom:'20px'}} onClick={() => this.showChangeLessionTitle()} size="small" type="warning">Change</Button>
                    <Button onClick={() => this.props.onDeleteLession(this.props.id)} size="small" type="danger">Delete lession</Button>
                </div>
                
                <div style={{display:this.state.display_lession_title_input==true?'inline-block':'none'}}>
                    <Input  onChange={(event) => this.changeLessionTitle(event)} style={{width:'150px'}} placeholder="Please input" value={this.state.lessionContent.lession_title} />
                    <Button style={{marginBottom:'20px'}} onClick={() => this.saveChangeLessionTitle()} size="small" type="warning">Save</Button>
                </div>
          
         
          <Button onClick={() => this.showHideLessionContent()} type="primary" size="small">
            Show/hide content
          </Button>

          <div className='lession-content'>
            <div>Lession's content:</div>
            {this.state.lessionContent.lession_content}
            <br/>
                <div className="lession-content-type" style={{display:this.state.display_component==true?'inline-block':'none'}}>
                <input type="radio" id={`radLessionTextType_${this.props.id}`} checked={this.state.lessionContent.lession_type==0?'checked':''} onChange={(e) => this.chooseLessionContentType(e)} name={`lession_content_type_${this.props.id}`} value="text" /> Text&nbsp;
                    <input type="radio"  id={`radLessionVideoType_${this.props.id}`} checked={this.state.lessionContent.lession_type==1?'checked':''} onChange={(e) => this.chooseLessionContentType(e)} name={`lession_content_type_${this.props.id}`} value="video" /> Video
                </div>
                <br />

            <div style={{display:this.state.display_component==true?'inline-block':'none'}}>
                    <div className="lession-text" style={{display:this.state.lessionContent.lession_type==0?'inline-block':'none'}}>
                        <CKEditor 
                                activeClass="myCKEditor" 
                                content={this.state.content} 
                                events={{"change": this.onChange }}
                        />
                    </div>

                    <div className="video-player" 
                        style={{display:this.state.lessionContent.lession_type==1?'inline-block':'none'}}>
                        <Upload
                            name="myFile"
                            className="upload-demo"
                            action="http://localhost:3004/api/upload_file/"
                            onPreview={file => this.handlePreview(file)}
                            onRemove={(file, fileList2) => this.handleRemove(file, fileList2)}
                            onChange={(file, fileList2) => this.handleChange(file, fileList2)}
                            fileList={fileList2}
                            listType="picture"
                            tip={<div className="el-upload__tip"></div>}
                            >
                            <Button size="small" type="primary">Click to upload</Button>
                        </Upload>
                      
                 
                    </div>
                </div>

          </div>
        </div>

    );
  }
}



const mapStateToProps = (state) => {
    console.log("mapStateToProps calling....");
    console.log(state);
    return {
      //course_categories: state.couse_categories_reducer.course_categories,
      //single_course_detail: state.course_reducer.selected_instructor_course
    };
  };

  const mapActionToProps = (dispatch) => {
    return {
      //loadCourseCategory: dispatch(loadCourseCategories()),
      //loadCourseInfo: (courseID) => dispatch(getCourseById(courseID)),
      //updateCourseInfo: (courseID,course) => dispatch(updateCourseInfo(courseID,course)),

    };
  };

export default connect(mapStateToProps, mapActionToProps)(Lession);

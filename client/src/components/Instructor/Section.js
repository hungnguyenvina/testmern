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
    DatePicker
  } from "element-react";
import React, { Component } from "react";
import InstructorLayout from "./InstructorLayout";
import { connect } from "react-redux";
import { updateCourseInfo,getCourseById } from "../../redux/actions/courseAction";
import { loadCourseCategories } from "../../redux/actions/courseCategoryAction";
import  UIInput  from "../Utils/UIInput";
import SectionCss from './Section.css';
import {post} from 'axios';
import Lession from "./Lession";

class Section extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sections: [],
      display_section_title_input: false
    };
  }

  showChangeSectionTitle = () => {
    this.setState({
        display_section_title_input: !this.state.display_section_title_input
    })
  }

  saveChangeSectionTitle = () => {
      this.setState({
          display_section_title_input: !this.state.display_section_title_input
      })
      console.log('save new section title/......');
      console.log(this.state.sectionContent);
      this.props.onSectionChange(this.state.sectionContent);
  }

  deleteLession = (sectionLessionIndex) => {
    alert('section lession index:'+ sectionLessionIndex);
    const sectionLessionIndexArray = sectionLessionIndex.split('_');
    const sectionIndex= sectionLessionIndexArray[0];
    const lessionIndex= sectionLessionIndexArray[1];
    this.props.onDeleteLession(sectionIndex,lessionIndex);
}

  componentDidMount() {
    //const courseId = this.props.match.params.id;
    //this.props.loadCourseInfo(courseId);
  }

  componentWillMount() {
    let arrays = [];
   /* for (var i = 0; i < 1; i++) {
        arrays.push( <CurriculumLessionHOC
                        id={i}
                        section_id = {this.props.id}
                        lessions = {this.props.lessions}
                        noOfLessions={this.props.lessions.length} 
                        onDeleteSection={(event,id) => this.deleteSection(event,id)}
                   />)
    }*/
    for (var i = 0; i < this.props.lessions.length; i++) {
        let lessionID = this.props.id+"_"+i; 
        let sectionIndex =this.props.id;
    
        arrays.push( <Lession
                        key={lessionID}
                        isHidden="true"
                        id={lessionID}
                        lession_type={this.props.lessions[i].type}
                        lession_free_preview={this.props.lessions[i].free_preview}
                        lession_title={this.props.lessions[i].name}
                        lession_content={this.props.lessions[i].content}
                        lession_index={i}
                        section_index={sectionIndex}
                        onDeleteLession={(sectionLessionIndex) => this.deleteLession(sectionLessionIndex)} 
                        onLessionChange={(sectionIndex,lession_content) => this.updateLessionContent(sectionIndex,lession_content)} 
                   />)
    }
  
    const sectionContent = {
        section_index: this.props.id,
        section_title: this.props.section_title
    }
  
    this.setState({sectionContent:sectionContent, sections: arrays});
  }

  updateLessionContent = (sectionIndex,lession_content) => {
    //alert('lession index:'+ lession_content.lession_index);
    //alert('lession type:'+ lession_content.lession_type);
    //alert('lession content:'+ lession_content.lession_content);
    const lessionContent = {
        lession_index: lession_content.lession_index,
        lession_type: lession_content.lession_type, /* 0: lession's content is text, 1: video url */
        lession_content:lession_content.lession_content,
        lession_title: lession_content.lession_title
    }
    //console.log('lession');
    //console.log(lessionContent);
    //console.log('thisssssssssssss.dddđ....');
    //console.log(this.props);
    this.props.onLessionChange123(sectionIndex,lessionContent);
}

  componentWillReceiveProps(nextProps) {
    //alert('[CurriculumSectionItemHoc] :compo will receive props');
    console.log('[CurriculumSectionItemHoc] :nextProps');
    console.log(nextProps);
    //console.log('nextProps.lessions:');
    console.log('[CurriculumSectionItemHoc] : nextProps.lessions');
    console.log(nextProps.lessions);

    let arrays = [];
    for (var i = 0; i < nextProps.lessions?.length; i++) {
        //alert('nextProps.lessions[i].name = '+nextProps.lessions[i].name);
        //alert('nextProps.lessions[i].content = '+nextProps.lessions[i].content);
        //let lessionID = nextProps.id+"_"+nextProps.lessions[i].id;
        let lessionID = nextProps.id+"_"+i;
        //alert('lessionID:'+lessionID);
        let sectionIndex =nextProps.id;
        let lesssionContent = nextProps.lessions[i].content;
        arrays.push( <Lession
                        key={lessionID}
                        isHidden="true"
                        id={lessionID}
                        lession_title={nextProps.lessions[i].name}
                        lession_content={nextProps.lessions[i].content}
                        lession_index={i}
                        section_index={sectionIndex}
                        lession_type={this.props.lessions[i].type}
                        lession_free_preview={this.props.lessions[i].free_preview}
                        onDeleteLession={(lessionID) => this.deleteLession(lessionID)} 
                        onLessionChange={(sectionIndex,lesssionContent) => this.updateLessionContent(sectionIndex,lesssionContent)} 
                   />)
    }

    const sectionContent = {
        section_index: nextProps.id,
        section_title: nextProps.section_title
    }

    this.setState({sectionContent:sectionContent, sections: arrays});

}
  
changeSectionTitle = (value) => {
  let sectionContent = {...this.state.sectionContent };
  sectionContent['section_title'] = value;
  //console.log(value);
  this.setState({sectionContent});
}

  deleteSection = () => {

  }

  addLession = (sectionIndex,noOfLessions) => {
    alert('sectionIndex'+sectionIndex);
    alert('noOfLessions'+noOfLessions);
    //let lessionID = this.props.id+"_"+this.state.sections.length;
    //console.log('adding lession');
    //console.log(this.state.sections);
    let lessionID = sectionIndex + "_" + noOfLessions;
    alert('add lesssion'+lessionID);
    const newLessionTitle = 'your new lession name';
    const newLessionContent = '';//'http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v';
    const newLessionIndex = noOfLessions;
    const newLessionType=1;
    const newLessionFreePreview=0;
    let arrays = [
        ...this.state.sections,
        <Lession
                        key={lessionID}
                        isHidden="true"
                        id={lessionID}
                        lession_title={newLessionTitle}
                        lession_type={newLessionType}
                        lession_content={newLessionContent}
                        lession_free_preview={newLessionFreePreview}
                        lession_index={newLessionIndex}
                        section_index= {sectionIndex}
                        onDeleteLession={(lessionID) => this.deleteLession(lessionID)} 
                        onLessionChange={(sectionIndex,newLessionContent) => this.updateLessionContent(sectionIndex,newLessionContent)} 
                   />

                   
                   
    ];
//console.log('here am i');
    //console.log(arrays);
    
    const lessionContent = {
        lession_index: newLessionIndex,
        lession_type: 1, /* 0: lession's content is text, 1: video url */
        lession_content:newLessionContent,
        lession_title: newLessionTitle
    }
    //console.log('lessionContent....');
    //console.log(lessionContent);
    this.props.onLessionChange123(sectionIndex,lessionContent);
    this.setState({sections: arrays});
}

  render() {
    
    let x = this.state.sections.map(item => {
      return item;
    });

    return (
    
        <div className="section">
         
          <div style={{display:this.state.display_section_title_input==false?'inline-block':'none'}}>
                        <label className="lblSectionTitle">{this.props.section_title}</label>
                        <Button style={{marginBottom:'20px'}} onClick={() => this.showChangeSectionTitle()} size="small" type="warning">Change section title</Button>
                        <Button onClick={() => this.props.onDeleteSection(this.props.id)} size="small" type="danger">Delete section</Button>
                    </div>
                    <div style={{display:this.state.display_section_title_input==true?'inline-block':'none'}}>
                        <Input  onChange={(event) => this.changeSectionTitle(event)} style={{width:'150px'}} placeholder="Please input" value={this.state.sectionContent.section_title} />
                        <Button style={{marginBottom:'20px',float:'left'}} onClick={() => this.saveChangeSectionTitle()} size="small" type="warning">Save</Button>
                    </div>

         
          
          <Button style={{marginLeft:'10px'}} onClick={() => this.addLession(this.props.id,this.state.sections.length)} type="primary" size="small">
            Add new lession
          </Button>

          {x}
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

export default connect(mapStateToProps, mapActionToProps)(Section);

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
import { loadCourseCurriculum,updateCourseCurriculum } from "../../redux/actions/courseAction";
import  UIInput  from "../Utils/UIInput";
import CreateCourseCss from './CreateCourse.css';
import {post} from 'axios';
import Section from "./Section";
import Lession from "./Lession";

class UpdateCurriculum extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      curriculum: {
        sections: []
      }
    };
  }

  updateLessionContent = (section_index,lession) => {
    //alert('lession index in  update curri:'+ lession.lession_index);
    //alert('lession type in update curri:'+ lession.lession_type);
    //alert('lession content in  update curri:'+ lession.lession_content);
    var lession_index = lession.lession_index;
    let currentCurriculum = {...this.state.curriculum};
    //console.log('currentCurriculum.................................');
    //console.log(currentCurriculum);
    let currentSections = [
                            ...currentCurriculum.sections
                          ];

    for (var i = 0; i < currentSections.length; i++) {
        if(parseInt(i)===parseInt(section_index)) {
            //alert('this section'+i);
            let isFoundLession = "0";
            for (var j= 0; j < currentSections[i].props.lessions.length; j++) {
                if(parseInt(j)===parseInt(lession_index))
                {
                    console.log('yyyyyyyyyyyy:'+lession_index+"-"+currentSections[i].props.lessions[j].id);
                    console.log(currentSections[i]);
                    isFoundLession="1";
                    //alert('this lession'+j+'- '+lession.lession_title + "-"+ lession.lession_content);
                    let currentLession = {
                        id: currentSections[i].props.lessions[j].id,
                        section_id: currentSections[i].props.section_id,
                        name: lession.lession_title,
                        content: lession.lession_content,
                    };
                    currentSections[i].props.lessions[lession_index] = currentLession;
                }
            }
            //alert('isFoundLession='+isFoundLession);
            if(isFoundLession==="0") {
                //alert('add new lession: '+currentSections[section_index].props.lessions.length);
                let currentLession = {
                    id: currentSections[i].props.lessions.length,
                    section_id: currentSections[i].props.section_id,
                    name: lession.lession_title,
                    content: lession.lession_content
                };
                currentSections[i].props.lessions[lession.lession_index] = currentLession;
            }
        }
    }

    currentCurriculum.sections = currentSections;
    console.log('end update lession content');
    console.log(currentCurriculum);
    this.setState({curriculum: currentCurriculum});
}
  
  updateSectionTitle = (section_content) => {
    //alert('section tilte : '+section_content.section_title);
    let currentCurriculum = {...this.state.curriculum};
    console.log('currentCurriculum.................................');
    console.log(currentCurriculum);
    let currentSections = [
                            ...currentCurriculum.sections,
                            
                          ];
    //console.log('currentSections.................................');
    //console.log(currentSections);
    let indexSectionFound=0;
    for (var i = 0; i < currentSections.length; i++) {
        if(i==section_content.section_index) {
            //alert('this section'+i);
            //currentSections[i].props.section_title = section_content.section_title;
            indexSectionFound=i;
        }
    }

    let updatedCurrentSection= currentSections.map(item=> {
        console.log(item);
        //alert('item.props.idzzz : '+item.props.id);
       
        if(parseInt(item.props.id)===parseInt(indexSectionFound)) {
          //alert('indexSectionFound : '+ indexSectionFound);
           // alert(section_content.section_title);
            return <Section
                        key={indexSectionFound}
                        id={indexSectionFound}
                        section_title={section_content.section_title} 
                        noOfSections={currentSections.length} 
                        lessions = {currentSections[indexSectionFound].props.lessions}
                       
                        onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                        onDeleteSection={(indexSectionFound) => this.deleteSection(indexSectionFound)}
                        onLessionChange123={(indexSectionFound,lessionContent) => this.updateLessionContent(indexSectionFound,lessionContent)} 
                     
                        onDeleteLession={(indexSectionFound,lessionIndex) => this.deleteLession(indexSectionFound,lessionIndex)}
            />



        }
        else {
            return item;
        }
    })
  

    console.log('currentSections');
    console.log(updatedCurrentSection);


    currentCurriculum.sections = updatedCurrentSection;
    //console.log('end update section title');
   
    this.setState({curriculum: currentCurriculum});
}
  
deleteSection = (sectionIndex) => {
  //alert('delete section :'+sectionIndex);
  let currentCurriculum = {...this.state.curriculum};
  let currentSections = [
      ...currentCurriculum.sections,
      
  ];

  let updatedCurrentSections= currentSections.filter(item=> {
      return item.props.id!==sectionIndex
  });

  //console.log('currentSections');
  //console.log(updatedCurrentSections);


  currentCurriculum.sections = updatedCurrentSections;
  //console.log('end update section title');
  //console.log(currentCurriculum);
  this.setState({curriculum: currentCurriculum});
}

deleteLession = (sectionIndex,lessionIndex) => {
  alert('delete section:'+sectionIndex);
  alert('delete lession:'+lessionIndex);
  let currentCurriculum = {...this.state.curriculum};
  let currentSections = [
      ...currentCurriculum.sections
  ];
  console.log(currentSections);
  let currentLessions= [
      ...currentSections[sectionIndex].props.lessions
  ];
  console.log('currentLessions');
  console.log(currentLessions);
  //let updatedCurrentLession= currentLessions.filter(item=> {
  //    return item.id!==parseInt(lessionIndex)
  //});
  let updatedCurrentLession= currentLessions.filter((item,index)=> {
      alert('index='+index);
      return index!==parseInt(lessionIndex)
  });

  console.log('lessions after delete...');
  console.log(updatedCurrentLession);

  let updatedCurrentSection= currentSections.map(item=> {
      console.log(item);
     //alert('item.props.id : '+item.props.id);
      //alert('indexSectionFound : '+ sectionIndex);
      //alert('lession  : '+ item.props.lessions.length);
     
          //alert('item.props.id:'+item.props.id);
          if(parseInt(item.props.id)===parseInt(sectionIndex)) {
              //alert('xxxxxxxxxx'+item.props.id);
              return <Section
                      key={sectionIndex}
                      id={sectionIndex}
                      section_title={item.props.section_title} 
                      noOfSections={currentSections.length} 
                      lessions = {updatedCurrentLession}
                      onDeleteSection={(indexSectionFound) => this.deleteSection(indexSectionFound)}
                      onLessionChange123={(sectionIndex,lessionContent) => this.updateLessionContent(sectionIndex,lessionContent)} 
                      onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                      onDeleteLession={(sectionIndex,lessionIndex) => this.deleteLession(sectionIndex,lessionIndex)}
                  />
          }
          else{
              return item;
          }
  })

  //console.log('current section,,,,');
  //console.log(updatedCurrentSection);
  currentCurriculum.sections = updatedCurrentSection;
  //console.log('end update section title');
  //console.log(currentCurriculum);
  this.setState({curriculum: currentCurriculum});
}

  componentDidMount() {
    const courseID = this.props.match.params.id;
    this.props.loadCourseCurriculum(courseID);
  }

  componentWillReceiveProps(nextProps) {
    let me=this;
    if (nextProps.errorLoadCurriculum ) {
      const error = nextProps.errorLoadCurriculum;
    
      if(error !== "") {
        alert(error);
        setTimeout(function(){ me.props.history.push('/login'); }, 2000);
      }

    }

    console.log('receive props');
    let currentCurriculum = {...this.state.curriculum};
    const curriculums = nextProps.curriculum;
    console.log(curriculums);
    let sectionArrayDistinct = [];
    let sectionArray = [];
    let lessionArray = [];
    for (var i = 0; i < curriculums.length; i++) {
      if(curriculums[i].section_id) {
        const sectionID = curriculums[i].section_id._id;
        let newLession =  { 
            section_id: sectionID,
            id: curriculums[i]._id,
            name:curriculums[i].name, 
            content: curriculums[i].content,
            free_preview: curriculums[i].free_preview,
            type: curriculums[i].type
        }
        lessionArray.push(newLession);
      }
    }

    for (var i = 0; i < curriculums.length; i++) {
      if(curriculums[i].section_id) {
        const sectionID = curriculums[i].section_id._id;
        if(!sectionArrayDistinct.includes(sectionID)) {
            sectionArrayDistinct.push(sectionID);
            let newSection =  
            { 
                section_id: sectionID,
                title: curriculums[i].section_id.name,
                description: '',
                lessions:lessionArray.filter(item=> {
                    return item.section_id == sectionID
                })
            }
    
            sectionArray.push(newSection);
        }
      }
    }

    console.log('sectionArray..........................');
    console.log(sectionArray);
    let arrays = [];
    
    for (var i = 0; i < sectionArray.length; i++) {
        arrays.push( <Section
            key={i}
            id={i}
            section_id = {sectionArray[i].section_id} 
            section_title={sectionArray[i].title} 
            noOfSections={sectionArray.length} 
            lessions = {sectionArray[i].lessions}
            onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
            onDeleteSection={(newSectionIndex) => this.deleteSection(newSectionIndex)}
            onDeleteLession={(sectionIndex,lessionIndex) => this.deleteLession(sectionIndex,lessionIndex)}
            onLessionChange123={(sectionIndex,lessionContent) => this.updateLessionContent(sectionIndex,lessionContent)} 
       />)
    }

    currentCurriculum.sections = arrays;
    console.log(arrays);
    this.setState({curriculum: currentCurriculum});

}



addSection = () => {
  //alert('add section');
  let currentCurriculum = {...this.state.curriculum};
  //console.log('currentCurriculum.................................');
  //console.log(currentCurriculum);
  let newSectionIndex = parseInt(currentCurriculum.sections.length);
  //alert('newSectionIndex:'+newSectionIndex);
  const newSectionTitle = "your section title";
  const lessions=[];
  const newLesionIndex=0;
  let currentSections = [
      ...currentCurriculum.sections,
      <Section
              key={newSectionIndex}
              id={newSectionIndex}
              section_title={newSectionTitle} 
              noOfSections={currentCurriculum.sections.length} 
              lessions = {lessions}
              onDeleteSection={(newSectionIndex) => this.deleteSection(newSectionIndex)}
              onLessionChange123={(newSectionIndex,lession_content) => this.updateLessionContent(newSectionIndex,lession_content)} 
              onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
              onDeleteLession={(newSectionIndex,newLesionIndex) => this.deleteLession(newSectionIndex,newLesionIndex)}
      />
              
  ];
  
  currentCurriculum.sections = currentSections;
  //console.log('end update lession content');
  //console.log(currentCurriculum);
  this.setState({curriculum: currentCurriculum});
}

updateCourseCurriculum = () => {
  //alert('update course curriculum');
  console.log('this.state.curriculum');
  console.log(this.state.curriculum.sections);
 
  let isValidCurriculum = true;
  let message = "";
  if(this.state.curriculum.sections.length===0)
  {
      isValidCurriculum=false;
      message= "Please create at least one section!";
  }
  else{
      this.state.curriculum.sections.every(function (sectionItem) {
          console.log(sectionItem);
          if(sectionItem.props.lessions.length===0) {
              isValidCurriculum=false;
              message= "Each section must has at least one lession!";
              return false;
          }
      });
  }
  if(!isValidCurriculum) {
      alert(message);
  }
  else {
      const sections = this.state.curriculum.sections;
      const finalSections = sections.map(item=> {
          const itemSection = {
              section_id: item.props.lessions[0].section_id,
              section_title: item.props.section_title,
              lessions: item.props.lessions
          }
          return itemSection;
      });
      console.log(finalSections);
      const courseID = this.props.match.params.id;
      this.props.updateCourseCurriculum(courseID,{sections:finalSections});
  }
}

  render() {
    let x1 =  this.state.curriculum.sections.map(item => {
      return item;
    })

    return (
      <InstructorLayout>
        <div className="form-section">
          <h3>Update course curriculum</h3>
          {x1}
          <Button onClick={() => this.addSection()} type="info" size="large">
            Add new section
          </Button>
          <Button onClick={(e) => this.updateCourseCurriculum(e)} type="success" size="large">
            Save curriculum
          </Button>
        </div>
      </InstructorLayout>
    );
  }
}



const mapStateToProps = state => {
  console.log(state);
    return {
        curriculum : state.course_reducer.curriculum,
        errorLoadCurriculum: state.course_reducer.errorLoadCurriculum
    };
}

const mapDispatchToProps = dispatch => ({
  updateCourseCurriculum: (id,course) => dispatch(updateCourseCurriculum(id,course)),
  loadCourseCurriculum: id => dispatch(loadCourseCurriculum(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCurriculum);

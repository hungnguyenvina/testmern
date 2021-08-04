/*import {
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
import CreateCourseCss from './CreateCourse.css';
import {post} from 'axios';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.onChangeCKEditor = this.onChangeCKEditor.bind(this);
    this.state = {
      image: '',
      course_logo_url:'',
      courseForm: {
        title: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Enter course name",
            name: "title",
          },
          label: "Course's name",
          value: "",
          validation: {
            required: true,
          },
          valid: true,
          isDirty: false,
        },
        fee: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Enter course fee",
            name: "fee",
          },
          label: "Course's fee",
          value: "",
          validation: {
            required: true,
          },
          valid: true,
          isDirty: false,
        },
        short_description: {
          elementType: "input",
          elementConfig: {
            type: "ckeditor",
            placeholder: "Enter course short description",
            name: "short_description",
          },
          label: "Short description",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        full_description: {
          elementType: "input",
          elementConfig: {
            type: "ckeditor",
            placeholder: "Enter course full description",
            name: "full_description",
          },
          label: "Full description",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        goal: {
          elementType: "input",
          elementConfig: {
            type: "ckeditor",
            placeholder: "Enter course goal",
            name: "goal",
          },
          label: "Goal",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        requirement: {
          elementType: "input",
          elementConfig: {
            type: "ckeditor",
            placeholder: "Enter course requirement",
            name: "requirement",
          },
          label: "Requirement",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        skill_level: {
          elementType: "input",
          elementConfig: {
            type: "ckeditor",
            placeholder: "Enter course skill level",
            name: "skill_level",
          },
          label: "Skill level",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        language: {
          elementType: "input",
          elementConfig: {
            type: "ckeditor",
            placeholder: "Enter course language",
            name: "language",
          },
          label: "Language",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        courseCategory: {
          elementType: "select",
          elementConfig: {
            name: "course_category_id",
            options: [
              { value: "0", displayValue: "Enable" },
              { value: "1", displayValue: "Disable" },
            ],
            defaultOption: {
              value: "-1",
              displayValue: "Select parent",
            },
          },
          label: "Category",
          value: "1",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        course_logo: {
          elementType: "input",
          elementConfig: {
            type: "file",
            placeholder: "Enter course name",
            name: "course_logo",
          },
          label: "Course's logo",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
      },
    };
  }

  onChangeHandler = (value, nameOfElement) => {
    console.log("calling onChangeHandler method");
    console.log(value);
    console.log(nameOfElement);
    let updatedCourseForm = {
      ...this.state.courseForm,
    };

    updatedCourseForm[nameOfElement].value = value;
    this.setState({
      courseForm: updatedCourseForm,
    });
  };

  updateCourse = () => {
  
        let course_title = this.state.courseForm.title.value;
      alert('course name = '+course_title);
  
      let course_category_id = this.state.courseForm.courseCategory.value;
      alert('course_category_id = '+course_category_id);
      
      let course_picture_url = this.state.courseForm.course_logo.value;
      alert('course_logo = '+course_picture_url);
  
      let short_description = this.state.courseForm.short_description.value;
      alert('short_description = '+short_description);
  
      let description = this.state.courseForm.full_description.value;
      alert('full description = '+description);
  
      let goal = this.state.courseForm.goal.value;
      alert('goal = '+goal);
  
      let requirement = this.state.courseForm.requirement.value;
      alert('requirement = '+requirement);
  
      let skill_level = this.state.courseForm.skill_level.value;
      alert('skill_level = '+skill_level);
  
      let language = this.state.courseForm.language.value;
      alert('language = '+language);
  
      let fee = this.state.courseForm.fee.value;
      alert('fee = '+fee);
  
      const courseDataForUpdate = {
        title:course_title,
        course_category_id,
        course_picture_url,
        short_description,
        description,
        goal,
        requirement,
        skill_level,
        language,
        fee
      };
  
      const courseID = this.props.match.params.id;
      this.props.updateCourseInfo(courseID,courseDataForUpdate);
  };

  loadCourseCategoriesIntoArray() {
    let courseCategories = [];
    courseCategories.push({
      value: "-1",
      displayValue: "Select parent",
      parentName: "",
    });
    this.props.course_categories.map((item) => {
      courseCategories.push({
        value: item._id,
        displayValue: item.name,
        parentName: item.course_category_parent_name,
      });
    });
    return courseCategories;
  }

  handleRemove = (file, fileList) => {
    //alert('remove from list');
    //console.log(file, fileList);
  };

  handlePreview = (file) => {
    //alert('remove from list');
    //console.log(file, fileList);
  };

  handleChange = (file, fileList) => {
    //alert('on changexx');
    //console.log(file);
    //console.log(fileList);
    console.log('file name: '+file.raw.name);
    console.log(file.raw);
    this.createImage(file.raw);
  };

  createImage(file) {
    //alert('create image');
    let reader = new FileReader();
    reader.onload = (e) => {
      //console.log('picture result');
      //console.log(e.target.result);
      this.setState({ image: e.target.result });
      this.fileUpload(e.target.result, file.name);
    };
    reader.readAsDataURL(file);
  }

  fileUpload(image, fileName) {
    console.log("file upload");
    console.log(image);
    const url = "http://localhost:3004/api/upload_file";
    //const formData = {file: image,filename:fileName}
    const formData = { file: image, filename: fileName };
    return post(url, formData).then((response) => {
      let media = "";
      console.log("file response...." + response);
      console.log(response);
      console.log("file response...." + this.state.image);
      let urlResponse = response.data.url;
      //alert("urlResponse : " + urlResponse);
      let currentState = { ...this.state };
      let courseFormSate = { ...currentState.courseForm };
      let courseLogoState = {
        ...courseFormSate.course_logo,
        value: urlResponse,
      };
      courseFormSate.course_logo = courseLogoState;
      currentState.courseForm.course_logo = courseLogoState;
      this.setState({
        courseForm: courseFormSate,
        course_logo_url: urlResponse,
      });
    });
  }

  componentDidMount() {
    const courseId = this.props.match.params.id;
    this.props.loadCourseInfo(courseId);
  }

  onChangeCKEditor(evt) {
    let inputIdentifier = "";
    console.log("onChangeCKEditor...................");
    console.log(evt);
    let nameOfCKEditor = evt.editor.name;
    //alert('nameOfCKEditor='+nameOfCKEditor);

    var valueOfCKEditor = evt.editor.getData();
    //alert('valueOfCKEditor : '+valueOfCKEditor);
    if (nameOfCKEditor === "editor1") {
      //short description
      inputIdentifier = "short_description";
    } else if (nameOfCKEditor === "editor2") {
      //full description
      inputIdentifier = "full_description";
    } else if (nameOfCKEditor === "editor3") {
      //goal
      inputIdentifier = "goal";
    } else if (nameOfCKEditor === "editor4") {
      //requirement
      inputIdentifier = "requirement";
    } else if (nameOfCKEditor === "editor5") {
      //skill_level
      inputIdentifier = "skill_level";
    } else if (nameOfCKEditor === "editor6") {
      //language
      inputIdentifier = "language";
    }

    const updatedCourseForm = {
      ...this.state.courseForm,
    };
    updatedCourseForm[inputIdentifier].value = valueOfCKEditor;
    updatedCourseForm[inputIdentifier].isDirty = true;
    this.setState({ courseForm: updatedCourseForm });
  }

  componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
		console.log(nextProps.single_course_detail);
		const course_detail_info = nextProps.single_course_detail;

		if(course_detail_info.hasOwnProperty('title'))
		{
			const updatedCourseForm = {
				...this.state.courseForm
			}
			updatedCourseForm['title'].value = course_detail_info.title;
		
			updatedCourseForm['short_description'].value = course_detail_info.short_description;
			updatedCourseForm['full_description'].value = course_detail_info.description;
			updatedCourseForm['goal'].value = course_detail_info.goal;
			updatedCourseForm['requirement'].value = course_detail_info.requirement;
			updatedCourseForm['skill_level'].value = course_detail_info.skill_level;
			updatedCourseForm['language'].value = course_detail_info.language;
      updatedCourseForm['fee'].value = course_detail_info.fee;
      
     
      updatedCourseForm['courseCategory'].value = course_detail_info.course_category_id;
      
      
			updatedCourseForm['courseCategory'].elementConfig.defaultOption = {
				
					value: course_detail_info.course_category_id, displayValue: 'Select category'
				
      }
      

      if(course_detail_info.course_category_id==""){
        updatedCourseForm['courseCategory'].value = "-1";
        updatedCourseForm['courseCategory'].elementConfig.defaultOption = {
				
					value: "-1", displayValue: 'Select parent'
				
      }
      }

			
			
			updatedCourseForm['course_logo'].value = course_detail_info.course_picture_url;

			this.setState({courseForm: updatedCourseForm});
    }
  }
  
  render() {
    if (
      this.props.course_categories &&
      this.props.course_categories.length > 0
    ) {
      const updatedCreateCourseForm = {
        ...this.state.courseForm,
      };

      updatedCreateCourseForm.courseCategory.elementConfig.options = this.loadCourseCategoriesIntoArray();
    }

    const formElementsArray = [];
    for (let key in this.state.courseForm) {
      formElementsArray.push({
        id: key,
        config: this.state.courseForm[key],
      });
    }

    let form = (
      <Form onSubmit={this.onSubmitHandler}>
        {formElementsArray.map((formElement) => {
          if (formElement.config.elementConfig.type === "file") {
            return (
              <UIInput
                name="myFile"
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                onPreview={(file) => this.handlePreview(file)}
                onRemove={(file, fileList2) =>
                  this.handleRemove(file, fileList2)
                }
                onChange={(file, fileList2) =>
                  this.handleChange(file, fileList2)
                }
                fileList={this.fileList}
                action="http://localhost:3004/api/upload_file/"
                onFormSubmit={(event) => this.onFormSubmit(event)}
                isValid={formElement.config.valid}
                validation={formElement.config.validation}
                isDirty={formElement.config.isDirty}
              />
            );
          } else if (formElement.config.elementConfig.type === "ckeditor") {
            return (
              <UIInput
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                content={formElement.config.value}
                onChangeCKEditor={this.onChangeCKEditor}
                onFormSubmit={(event) => this.onFormSubmit(event)}
                isValid={formElement.config.valid}
                validation={formElement.config.validation}
                isDirty={formElement.config.isDirty}
              />
            );
          } else {
            return (
              <UIInput
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                onChange={(event) =>
                  this.onChangeHandler(event, formElement.id)
                }
                onFormSubmit={(event) => this.onFormSubmit(event)}
                isValid={formElement.config.valid}
                validation={formElement.config.validation}
                isDirty={formElement.config.isDirty}
              />
            );
          }
        })}
      </Form>
    );

    return (
      <InstructorLayout>
        <div className="form-section">
          <h3>Update your course</h3>
          {form}
          <Button onClick={() => this.updateCourse()} type="info" size="small">
            Save
          </Button>
        </div>
      </InstructorLayout>
    );
  }
}



const mapStateToProps = (state) => {
    console.log("mapStateToProps calling....");
    console.log(state);
    return {
      course_categories: state.couse_categories_reducer.course_categories,
      single_course_detail: state.course_reducer.selected_instructor_course
    };
  };

  const mapActionToProps = (dispatch) => {
    return {
      loadCourseCategory: dispatch(loadCourseCategories()),
      loadCourseInfo: (courseID) => dispatch(getCourseById(courseID)),
      updateCourseInfo: (courseID,course) => dispatch(updateCourseInfo(courseID,course)),

    };
  };

export default connect(mapStateToProps, mapActionToProps)(UpdateCourse);*/
import {Table,Icon,Tag, Button,Loading,Pagination,Dialog,Form,Checkbox,Radio,Switch,TimePicker,Input,Select,Layout,DatePicker} from "element-react";
import React, { Component } from "react";
import InstructorLayout from "./InstructorLayout";
import { connect } from "react-redux";
import { createCourse, getCourseById,updateCourseInfo} from "../../redux/actions/courseAction";
import { loadCourseCategories} from "../../redux/actions/courseCategoryAction";
import {post} from 'axios';
import  UIInput  from "../Utils/UIInput";
import CreateCourseCss from './CreateCourse.css';
 
class UpdateCourse extends Component {
    constructor(props) {
      super(props);
      this.onChangeCKEditor = this.onChangeCKEditor.bind(this);
      this.state = {
        image: '',
        course_logo_url:'',
        courseForm: {
          title: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter course name",
              name: "title",
            },
            label: "Course's name",
            value: "",
            validation: {
              required: true,
            },
            valid: true,
            isDirty: false,
          },
          fee: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter course fee",
              name: "fee",
            },
            label: "Course's fee",
            value: "",
            validation: {
              required: true,
            },
            valid: true,
            isDirty: false,
          },
          short_description: {
            elementType: "input",
            elementConfig: {
              type: "ckeditor",
              placeholder: "Enter course short description",
              name: "short_description",
            },
            label: "Short description",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          full_description: {
            elementType: "input",
            elementConfig: {
              type: "ckeditor",
              placeholder: "Enter course full description",
              name: "full_description",
            },
            label: "Full description",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          goal: {
            elementType: "input",
            elementConfig: {
              type: "ckeditor",
              placeholder: "Enter course goal",
              name: "goal",
            },
            label: "Goal",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          requirement: {
            elementType: "input",
            elementConfig: {
              type: "ckeditor",
              placeholder: "Enter course requirement",
              name: "requirement",
            },
            label: "Requirement",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          skill_level: {
            elementType: "input",
            elementConfig: {
              type: "ckeditor",
              placeholder: "Enter course skill level",
              name: "skill_level",
            },
            label: "Skill level",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          language: {
            elementType: "input",
            elementConfig: {
              type: "ckeditor",
              placeholder: "Enter course language",
              name: "language",
            },
            label: "Language",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          courseCategory: {
            elementType: "select",
            elementConfig: {
              name: "course_category_id",
              options: [
                { value: "0", displayValue: "Enable" },
                { value: "1", displayValue: "Disable" },
              ],
              defaultOption: {
                value: "-1",
                displayValue: "Select parent",
              },
            },
            label: "Category",
            value: "1",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
          course_logo: {
            elementType: "input",
            elementConfig: {
              type: "file",
              placeholder: "Enter course name",
              name: "course_logo",
            },
            label: "Course's logo",
            value: "",
            validation: {
              required: false,
            },
            valid: true,
            isDirty: false,
          },
        },
      };
    }

    onChangeHandler = (value,nameOfElement) => {
      console.log('calling onChangeHandler method');
      console.log(value);
      console.log(nameOfElement);
      let updatedCourseForm = {
        ...this.state.courseForm
      }
    
      updatedCourseForm[nameOfElement].value = value;
      this.setState({
        courseForm: updatedCourseForm
      });
    }

    updateCourse = () => {
  
      let course_title = this.state.courseForm.title.value;
    alert('course name = '+course_title);

    let course_category_id = this.state.courseForm.courseCategory.value;
    alert('course_category_id = '+course_category_id);
    
    let course_picture_url = this.state.courseForm.course_logo.value;
    alert('course_logo = '+course_picture_url);

    let short_description = this.state.courseForm.short_description.value;
    alert('short_description = '+short_description);

    let description = this.state.courseForm.full_description.value;
    alert('full description = '+description);

    let goal = this.state.courseForm.goal.value;
    alert('goal = '+goal);

    let requirement = this.state.courseForm.requirement.value;
    alert('requirement = '+requirement);

    let skill_level = this.state.courseForm.skill_level.value;
    alert('skill_level = '+skill_level);

    let language = this.state.courseForm.language.value;
    alert('language = '+language);

    let fee = this.state.courseForm.fee.value;
    alert('fee = '+fee);

    const courseDataForUpdate = {
      title:course_title,
      course_category_id,
      course_picture_url,
      short_description,
      description,
      goal,
      requirement,
      skill_level,
      language,
      fee
    };

    const courseID = this.props.match.params.id;
    this.props.updateCourseInfo(courseID,courseDataForUpdate);
};

    loadCourseCategoriesIntoArray() {
        let courseCategories =[];
        courseCategories.push( { value: "-1", displayValue: "Select parent", parentName: "" });
        this.props.course_categories.map(item => {
          courseCategories.push( { value: item._id, displayValue: item.name, parentName: item.course_category_parent_name });
        });
        return courseCategories;
    }
    handleRemove = (file, fileList) => {
      //alert('remove from list');
      //console.log(file, fileList);
    };
  
    handlePreview = (file) => {
      //alert('remove from list');
      //console.log(file, fileList);
    };
  
    handleChange = (file, fileList) => {
      //alert('on changexx');
      //console.log(file);
      //console.log(fileList);
      // console.log('file name: '+file.raw.name);
      // console.log(file.raw);
      this.createImage(file.raw);
    };
    createImage(file) {
      //alert('create image');
      let reader = new FileReader();
      reader.onload = (e) => {
        //console.log('picture result');
        //console.log(e.target.result);
        this.setState({ image: e.target.result });
        this.fileUpload(e.target.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  
    fileUpload(image, fileName) {
      console.log("file upload");
      console.log(image);
      const url = "http://localhost:3004/api/upload_file";
      //const formData = {file: image,filename:fileName}
      const formData = { file: image, filename: fileName };
      return post(url, formData).then((response) => {
        let media = "";
        console.log("file response...." + response);
        console.log(response);
        console.log("file response...." + this.state.image);
        let urlResponse = response.data.url;
        alert("urlResponse : " + urlResponse);
        let currentState = { ...this.state };
        let courseFormSate = { ...currentState.courseForm };
        let courseLogoState = {
          ...courseFormSate.course_logo,
          value: urlResponse,
        };
        courseFormSate.course_logo = courseLogoState;
        currentState.courseForm.course_logo = courseLogoState;
        this.setState({
          courseForm: courseFormSate,
          course_logo_url: urlResponse,
        });
      });
    }
  
componentDidMount() {
  const courseId = this.props.match.params.id;
  this.props.loadCourseInfo(courseId);
}


onChangeCKEditor(evt){
  let inputIdentifier = "";
  console.log("onChangeCKEditor...................");
  console.log(evt);
  let nameOfCKEditor = evt.editor.name;
  //alert('nameOfCKEditor='+nameOfCKEditor);

  var valueOfCKEditor = evt.editor.getData();
  //alert('valueOfCKEditor : '+nameOfCKEditor);
  if (nameOfCKEditor === "editor1") {
    //short description
    inputIdentifier = "short_description";
  } else if (nameOfCKEditor === "editor2") {
    //full description
    inputIdentifier = "full_description";
  } else if (nameOfCKEditor === "editor3") {
    //goal
    inputIdentifier = "goal";
  } else if (nameOfCKEditor === "editor4") {
    //requirement
    inputIdentifier = "requirement";
  } else if (nameOfCKEditor === "editor5") {
    //skill_level
    inputIdentifier = "skill_level";
  } else if (nameOfCKEditor === "editor6") {
    //language
    inputIdentifier = "language";
  }

  const updatedCourseForm = {
    ...this.state.courseForm
  }
  updatedCourseForm[inputIdentifier].value = valueOfCKEditor;
  updatedCourseForm[inputIdentifier].isDirty = true;
  this.setState({courseForm: updatedCourseForm });
}

componentWillReceiveProps(nextProps) {
  console.log('componentWillReceiveProps');
  console.log(nextProps.single_course_detail);
  const course_detail_info = nextProps.single_course_detail;

  if(course_detail_info.hasOwnProperty('title'))
  {
    const updatedCourseForm = {
      ...this.state.courseForm
    }
    updatedCourseForm['title'].value = course_detail_info.title;
  
    updatedCourseForm['short_description'].value = course_detail_info.short_description;
    updatedCourseForm['full_description'].value = course_detail_info.description;
    updatedCourseForm['goal'].value = course_detail_info.goal;
    updatedCourseForm['requirement'].value = course_detail_info.requirement;
    updatedCourseForm['skill_level'].value = course_detail_info.skill_level;
    updatedCourseForm['language'].value = course_detail_info.language;
    updatedCourseForm['fee'].value = course_detail_info.fee;
    updatedCourseForm['courseCategory'].value = course_detail_info.course_category_id;
    updatedCourseForm['courseCategory'].elementConfig.defaultOption = {
        value: course_detail_info.course_category_id, displayValue: 'Select category'
    }
    if(course_detail_info.course_category_id==""){
      updatedCourseForm['courseCategory'].value = "-1";
      updatedCourseForm['courseCategory'].elementConfig.defaultOption = {
        value: "-1", displayValue: 'Select parent'
    }
    }
    updatedCourseForm['course_logo'].value = course_detail_info.course_picture_url;
    this.setState({courseForm: updatedCourseForm});
  }
}

    render() {
        if (
          this.props.course_categories &&
          this.props.course_categories.length > 0
        ) {
          const updatedCreateCourseForm = {
            ...this.state.courseForm,
          };

          updatedCreateCourseForm.courseCategory.elementConfig.options = this.loadCourseCategoriesIntoArray();
        }
  
        const formElementsArray = [];
        for(let key in this.state.courseForm) {
            formElementsArray.push({
            id: key,
            config: this.state.courseForm[key]
            });
        }

        let form = (
          <Form onSubmit={this.onSubmitHandler}>
            {formElementsArray.map((formElement) => {
              if (formElement.config.elementConfig.type === "file") {
                return (
                  <UIInput 
                    name="myFile"    
                    key={formElement.id}
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    onPreview={(file) => this.handlePreview(file)}
                    onRemove={(file, fileList2) =>
                      this.handleRemove(file, fileList2)
                    }
                    onChange={(file, fileList2) =>
                      this.handleChange(file, fileList2)
                    }
                    fileList={this.fileList}
                    action="http://localhost:3004/api/upload_file/"
                    onFormSubmit={(event) => this.onFormSubmit(event)}
                    isValid={formElement.config.valid}
                    validation={formElement.config.validation}
                    isDirty={formElement.config.isDirty}
                  />
                );
              } else if (formElement.config.elementConfig.type === "ckeditor") {
                return (
                  <UIInput
                    key={formElement.id}
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    content={formElement.config.value}
                    onChangeCKEditor={this.onChangeCKEditor}
                    onFormSubmit={(event) => this.onFormSubmit(event)}
                    isValid={formElement.config.valid}
                    validation={formElement.config.validation}
                    isDirty={formElement.config.isDirty}
                  />
                );
              } else {
                return (
                  <UIInput
                    key={formElement.id}
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    onChange={(event) =>
                      this.onChangeHandler(event, formElement.id)
                    }
                    onFormSubmit={(event) => this.onFormSubmit(event)}
                    isValid={formElement.config.valid}
                    validation={formElement.config.validation}
                    isDirty={formElement.config.isDirty}
                  />
                );
              }
            })}
          </Form>
        );
        return (
          <InstructorLayout>
            <div className="form-section">
              <h3>Update your course</h3>
              {form}
              <Button onClick={() => this.updateCourse()} type="info" size="small">
                Save
              </Button>
            </div>
          </InstructorLayout>
        );
      }
}

  const mapStateToProps = (state) => {
    console.log("mapStateToProps calling....");
    console.log(state);
    return {
      course_categories: state.couse_categories_reducer.course_categories,
      single_course_detail: state.course_reducer.selected_instructor_course
    };
  };
  const mapActionToProps = (dispatch) => {
    return {
      loadCourseCategory: dispatch(loadCourseCategories()),
      loadCourseInfo: (courseID) => dispatch(getCourseById(courseID)),
      updateCourseInfo: (courseID,course) => dispatch(updateCourseInfo(courseID,course)),
    };
  };

export default connect(mapStateToProps, mapActionToProps)(UpdateCourse);

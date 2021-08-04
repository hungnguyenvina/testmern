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
import { createCourse } from "../../redux/actions/courseAction";
import { loadCourseCategories } from "../../redux/actions/courseCategoryAction";
import  UIInput  from "../Utils/UIInput";
import CreateCourseCss from './CreateCourse.css';
  
class CreateCourse extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        courseForm: {
            name: {
              elementType: "input",
              elementConfig: {
                type: "text",
                placeholder: "Enter name of course",
                name: "name",
              },
              label: "Name",
              value: "",
              validation: {
                required: true,
                minLength: 3,
              },
              valid: true,
              isDirty: false,
            },
            courseCategory: {
              elementType: "select",
              elementConfig: {
                name: "course_category_id",
                placeholder: "choose course category",
                options: [
                
                ],
                defaultOption: {
                  value: "-1",
                  displayValue: "Select category",
                },
              },
              label: "Category",
              value: "1",
              validation: {
                required: false,
              },
              valid: true,
              isDirty: false,
            }
          },
      }
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

    componentWillReceiveProps(nextProps) {
      let me=this;
      if (nextProps.users ) {
        const role = nextProps.users.role;
        alert(role);
        if(role !== 1) {
          alert('is not instructor');
          setTimeout(function(){ me.props.history.push('/login'); }, 2000);
        }

      }
    }

    createCourse = () => {
      alert('create course');
      alert('title:'+ this.state.courseForm.name.value);
      alert('course_category_id:'+ this.state.courseForm.courseCategory.value);
      let course = {
        title: this.state.courseForm.name.value,
        course_category_id: this.state.courseForm.courseCategory.value
      }
      this.props.createCourse(course);
    }
    loadCourseCategoriesIntoArray() {
        let courseCategories =[];
        courseCategories.push( { value: "-1", displayValue: "Select parent", parentName: "" });
        this.props.course_categories.map(item => {
          courseCategories.push( { value: item._id, displayValue: item.name, parentName: item.course_category_parent_name });
        });
        return courseCategories;
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
            <Form >
            {formElementsArray.map(formElement => (
                <UIInput key={formElement.id}
                    label={formElement.config.label}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    onChange={(event) => this.onChangeHandler(event,formElement.id)}
                    isValid={formElement.config.valid}
                    validation={formElement.config.validation}
                    isDirty={formElement.config.isDirty}
                />
                )
            )}
            </Form>
            
        );

        return (
            <InstructorLayout>
              <div className="form-section">
                <h3>Create your course</h3>
                {form}
                <Button onClick={()=> this.createCourse()}  type="info" size="small">
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
      users: state.users.user
    };
  };

  const mapActionToProps = (dispatch) => {
    return {
      loadCourseCategory: dispatch(loadCourseCategories()),
      createCourse: (course) => dispatch(createCourse(course)),

    };
  };

export default connect(mapStateToProps, mapActionToProps)(CreateCourse);

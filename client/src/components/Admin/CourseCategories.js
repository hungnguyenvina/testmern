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
import AdminLayout from "./AdminLayout";
import { connect } from "react-redux";
import { loadCourseCategories, createCourseCategory, updateCourseCategory,deleteCourseCategory } from "../../redux/actions/courseCategoryAction";
import  UIInput  from "../Utils/UIInput";

class CourseCategories extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this.state = {
      dialogVisible: false,
      isUpdate: false,
      selectedCourseCategoryId: "",
      courseCategoryForm: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Enter name of course category",
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
        description: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Enter description of course category",
            name: "description",
          },
          label: "Description",
          value: "",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        courseCategoryParent: {
          elementType: "select",
          elementConfig: {
            name: "course_category_parent_id",
            placeholder: "choose course category parent",
            options: [
              { value: "0", displayValue: "Enable", parentName: "" },
              { value: "1", displayValue: "Disable", parentName: "" }
            ],
            defaultOption: {
              value: "0",
              displayValue: "Select category11111",
            },
          },
          label: "Belongs to",
          value: "1",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
        status: {
          elementType: "select",
          elementConfig: {
            name: "status",
            options: [
              { value: "0", displayValue: "Enable", parentName: "" },
              { value: "1", displayValue: "Disable", parentName: "" },
            ],
            defaultOption: {
              value: "0",
              displayValue: "Select status",
            },
          },
          label: "Status",
          value: "0",
          validation: {
            required: false,
          },
          valid: true,
          isDirty: false,
        },
      },
      currentPage: 1,
      noOfItemsPerPage: 5,
      loading: true,
      columns: [
        {
          type: "index",
        },
        {
          label: "Parent category",
          prop: "date",
          width: 180,
          render: function (data) {
            return (
              <span>
             
                <span style={{ marginLeft: "10px" }}>
                  {data.course_category_parent_name}
                </span>
              </span>
            );
          },
        },
        {
          label: "Name",
          prop: "name",
          width: 180,
          render: function (data) {
            return <Tag>{data.name}</Tag>;
          },
        },
        {
          label: "Description",
          prop: "name",
          width: 180,
          render: function (data) {
            return <Tag>{data.description}</Tag>;
          },
        },
        {
          label: "Status",
          prop: "name",
          width: 180,
          render: function (data) {
            if(data.status===0) {
              return <Tag>Enable</Tag>;
            }
            else{
              return <Tag>Disable</Tag>;
            }
            
          },
        },
        {
          label: "Operations",
          render: function (data) {
            return (
              <span>
                <Button onClick={()=> me.editCourseCategory(data, me)} plain={true} type="info" size="small">
                  Edit
                </Button>
                <Button type="danger" size="small" onClick={() => me.deleteCourseCategory(data,me)}>Delete</Button>
              </span>
            );
          },
        },
      ],
      data: [],
    };
  }

  deleteCourseCategory = (item,me) => {
    console.log('deleteCourseCategory............');
    console.log(item);
    console.log(me);
    me.props.deleteCourseCategory(item._id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true, data: [] });
    console.log("componentWillReceiveProps");
    console.log(nextProps);
    if (nextProps.course_categories && nextProps.course_categories.length > 0) {
      this.setState({ loading: false, data: nextProps.course_categories });
    }
  }

  editCourseCategory = (data, me) => {
    let courseCategoryFormUpdated = {
      ...me.state.courseCategoryForm
    };
    let selectedCourseCategory = "";
    const selectedCourseCategoryParentId = data.course_category_parent_id;

    courseCategoryFormUpdated.name.value = data.name;
    courseCategoryFormUpdated.description.value = data.description;
    courseCategoryFormUpdated.courseCategoryParent.elementConfig.options = this.loadCourseCategoriesIntoArray();

    for( let j=0;j<this.props.course_categories.length;j++){
     
      if(this.props.course_categories[j]._id === selectedCourseCategoryParentId) {
        selectedCourseCategory = this.props.course_categories[j]._id;
      }
    }

    if(selectedCourseCategory==="") {
      selectedCourseCategory = "0";
    }
    courseCategoryFormUpdated.courseCategoryParent.elementConfig.defaultOption.value = selectedCourseCategory;
    courseCategoryFormUpdated.status.elementConfig.defaultOption.value =  ""+data.status;
    
    this.setState({
      dialogVisible: true,
      isUpdate: true,
      selectedCourseCategoryId: data._id,
      courseCategoryForm: courseCategoryFormUpdated
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }
  
  onChange(key, value) {
    this.state.form[key] = value;
    this.forceUpdate();
  }

  componentDidMount() {
    /* axios.get('http://localhost:3004/api/course_categories')
      .then(result=> {
        console.log(result.data);
      })
      fetch('http://localhost:3004/api/course_categories')
      .then(res => res.json())
      .then(results => {
        console.log(results);
      })*/
    console.log("results from redux store");
    console.log(this.props.course_categories);
  }

  changePageIndex = (currentPage) => {
    alert("currentpage = " + currentPage);
    this.setState({ currentPage: currentPage });
  };

  getPaginationData(currentPage, data) {
    const startIndex = (currentPage - 1) * this.state.noOfItemsPerPage;
    const endIndex = startIndex + this.state.noOfItemsPerPage;
    data = data.slice(startIndex, endIndex);
    return data;
  }

  onChangeHandler = (value,nameOfElement) => {
    console.log('calling onChangeHandler method');
    console.log(value);
    console.log(nameOfElement);
    let updatedCourseCategoryForm = {
      ...this.state.courseCategoryForm
    }

    updatedCourseCategoryForm[nameOfElement].value = value;
    this.setState({
      courseCategoryForm: updatedCourseCategoryForm
    });
  }

  openDialog = () => {
    
    let courseCategoryFormUpdated = {
      ...this.state.courseCategoryForm
    };

    let courseCategoryParentUpdated = {
      ...courseCategoryFormUpdated.courseCategoryParent
    }
    courseCategoryParentUpdated.elementConfig.options = this.loadCourseCategoriesIntoArray();

    this.setState({ 
      dialogVisible: true,
      isUpdate: false,
      courseCategoryForm : courseCategoryFormUpdated
    });

  }

  loadCourseCategoriesIntoArray() {
    let courseCategories =[];
    courseCategories.push( { value: "0", displayValue: "Select parent", parentName: "" });
    this.props.course_categories.map(item => {
      courseCategories.push( { value: item._id, displayValue: item.name, parentName: item.course_category_parent_name });
    });
    return courseCategories;
  }

  saveCourseCategory = () => {

    //alert('course category name='+this.state.courseCategoryForm.name.value);
    //alert('course category desc='+this.state.courseCategoryForm.description.value);
    //alert('course category parent id='+this.state.courseCategoryForm.courseCategoryParent.value);
    //alert('status='+this.state.courseCategoryForm.status.value);
    const courseCategory = {
      name: this.state.courseCategoryForm.name.value,
      description: this.state.courseCategoryForm.description.value,
      course_category_parent_id: this.state.courseCategoryForm.courseCategoryParent.value,
      status: this.state.courseCategoryForm.status.value
    }
    if(this.state.isUpdate)
    {
      //alert('update course category...'+this.state.selectedCourseCategoryId);
      this.props.updateCourseCategory(this.state.selectedCourseCategoryId,courseCategory);
      this.setState({ 
        dialogVisible: false
      });
    }
    else {
      //alert('create course category...');
      this.props.createCourseCategory(courseCategory);
      this.setState({ 
        dialogVisible: false
      });
    }
    

    
  }

  render() {

    const formElementsArray = [];
      for(let key in this.state.courseCategoryForm) {
        formElementsArray.push({
          id: key,
          config: this.state.courseCategoryForm[key]
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

    let courses = [];
    if (this.state.data.length > 0) {
      courses = this.getPaginationData(this.state.currentPage, this.state.data);
    }

    return (
      <AdminLayout {...this.props}>
        <h3>Course categories</h3>
        <Button
          onClick={() => this.openDialog()}
          style={{ float: "left", marginBottom: "20px" }}
          type="info"
        >
          Create new category
        </Button>
        <Loading text="Loading..." loading={this.state.loading}>
          <Table
            style={{ width: "96%", marginTop: "20px" }}
            columns={this.state.columns}
            data={courses}
            border={true}
            highlightCurrentRow={true}
            onCurrentChange={(item) => {
              console.log(item);
            }}
          />

          <div className="block">
            <Pagination
              onCurrentChange={this.changePageIndex}
              pageSize={this.state.noOfItemsPerPage}
              layout="prev, pager, next"
              total={this.state.data.length}
            />
          </div>
        </Loading>

        <Dialog
          title="Create a new course category"
          size="small"
          visible={this.state.dialogVisible}
          onCancel={() => this.setState({ dialogVisible: false })}
          lockScroll={false}
        >
          <Dialog.Body>
            {form}
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            
            <Button
              type="primary"
              onClick={() => this.saveCourseCategory()}
            >
              Save
            </Button>
            <Button onClick={() => this.setState({ dialogVisible: false })}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog>
      </AdminLayout>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps calling....");
  console.log(state);
  return {
    course_categories: state.couse_categories_reducer.course_categories,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    loadCourseCategory: dispatch(loadCourseCategories()),
    deleteCourseCategory: (courseCategoryID) => dispatch(deleteCourseCategory(courseCategoryID)),
    createCourseCategory: (courseCategory) => dispatch(createCourseCategory(courseCategory)),
    updateCourseCategory: (id,courseCategory) => dispatch(updateCourseCategory(id,courseCategory))
  };
};
export default connect(mapStateToProps, mapActionToProps)(CourseCategories);

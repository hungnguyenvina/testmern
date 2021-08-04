import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Button, Loading, Tag, Table, Pagination } from "element-react";

import { loadInstructorCourses,deleteCourse,submitCourseForApproval } from "../../redux/actions/courseAction";
import { hoc } from "../hoc/hoc";
import InstructorLayout from './InstructorLayout';
class ManageCourses extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this.state = {
      loading: true,
      message: "",
      columns: [
        {
          type: "index"
        },
        {
          label: "Category",
          prop: "category_parent_name",
          align: "left",
          width: 180,
          render: function(data) {
            return (
              <span>
                <span style={{ marginLeft: "10px", textAlign: "left" }}>
                  {data.course_category_parent_name}
                </span>
              </span>
            );
          }
        },
        {
          label: "Name",
          prop: "name",
          width: 300,
          align: "left",
          render: function(data) {
            return <Link to={`/instructor/update_course/${data.id}`}>{data.title}</Link>;
          }
        },
        {
          label: "Fee($)",
          prop: "fee",
          width: 80,
          align: "center",
          render: function(data) {
			if (data.fee === 0) {
				return (
				  <Button type="success" size="small">
					{data.fee}
				  </Button>
				);
			  } else {
				return (
				  <Button type="warning" size="small">
					{data.fee}
				  </Button>
				);
			  }
          }
        },
        {
          label: "Description",
          prop: "description",
          width: 200,
          align: "left",
          render: function(data) {
            return <span>{data.description}</span>;
          }
        },
        {
          label: "Operations",
          width: 270,
          align: "left",
          render: function(data) {
            let buttonJSX="";
            if(data.status===0) {
              buttonJSX= <Button type="info" size="small" onClick={() => me.submitCourseForApproval(data,me)}>New</Button>
            }
            else if(data.status===1) {
              buttonJSX= <Button type="warning" size="small" >Pending</Button>
            }
            else if(data.status===2) {
              buttonJSX= <Button type="success" size="small" >Approved</Button>
            }
            else if(data.status===3) {
              buttonJSX= <Button type="danger" size="small" onClick={() => me.submitCourseForApproval(data,me)}>Rejected</Button>
            }
            else {
              buttonJSX= <Button type="info" size="small" onClick={() => me.submitCourseForApproval(data,me)}>New</Button>
            }

            return (
              <span>
                  {buttonJSX}
                  <Button type="danger" size="small" onClick={() => me.deleteCourse(data, me)}>Delete</Button>
                  <Button type="info" size="small"><Link style={{ textDecoration: 'none',color:'#ffffff' }} to={`/instructor/update_course_curriculum/${data.id}`}>Curriculum</Link></Button>
              </span>
            );
          }
        }
      ],
      currentPage: 1,
      noOfItemsPerPage: 5,
      data: [],
      dialogVisible: false,
      isUpdated: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  deleteCourse = (item,me) => {
    this.props.deleteCourse(item.id);
  }

  submitCourseForApproval = (item,me) => {

      const data = { status: 1 };
      this.props.submitCourseForApproval(item.id, data);
  }

  handleClick(event) {
    //alert("select page" + Number(event.target.id));
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentWillReceiveProps(nextProps) {
    let courses = [];
    if (nextProps.courses && nextProps.courses.length > 0) {
      this.setState({ loading: true });
      nextProps.courses.map(item => {
        return courses.push({
          id: item.id,
          title: item.title,
          description: item.description,
          fee: item.fee,
          course_category_parent_name: item.course_category_name,
          status: item.status
        });
      });

      this.setState({
        loading: false,
        data: courses
      });
    } else {
      this.setState({
        loading: false,
        data: []
      });
    }
  }

  onCurrentChange = currentPage => {
    this.setState({
      currentPage: currentPage
    });
  };

  getPaginationData(currentPage, data) {
    const startIndex = (currentPage - 1) * this.state.noOfItemsPerPage;
    const endIndex = startIndex + this.state.noOfItemsPerPage;
    data = data.slice(startIndex, endIndex);
    return data;
  }

  render() {
    const style1 = {
      width: "16px",
      height: "16px"
    };

    let courses = [...this.state.data];
    if (this.state.data.length > 0) {
      courses = this.getPaginationData(this.state.currentPage, courses);
    }

    return (
      <InstructorLayout {...this.props}>
      <React.Fragment>
        <h3
          style={{
            display: "inline-block",
            marginLeft: "10px",
            marginBottom: "20px"
          }}
        >
          Courses
        </h3>
        <Loading loading={this.state.loading}>
          <Table
            style={{ width: "95%", marginLeft: "10px", marginBottom: "20px" }}
            columns={this.state.columns}
            data={courses}
            border={true}
            highlightCurrentRow={true}
            onCurrentChange={item => {
              console.log(item);
            }}
          />
          <div className="first" style={{textAlign: 'center', marginBottom:'30px'}}>
                  <div className="block">
                    <Pagination pageSize={this.state.noOfItemsPerPage} onCurrentChange={this.onCurrentChange} layout="prev, pager, next" total={this.state.data.length}/>
                  </div>
                </div>
        </Loading>
      </React.Fragment>
      </InstructorLayout>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.courses);
  return {
    courses: state.course_reducer.instructor_courses
  };
};

const mapDispatchToProps = dispatch => ({
  loadInstructorCourses: dispatch(loadInstructorCourses()),
  deleteCourse: (courseID) => dispatch(deleteCourse(courseID)),
  submitCourseForApproval: (courseID,courseStatus) => dispatch(submitCourseForApproval(courseID,courseStatus))
});

export default hoc(ManageCourses, mapStateToProps, mapDispatchToProps);
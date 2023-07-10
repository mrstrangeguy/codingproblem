import React, { useEffect, useState } from 'react'
import './Studentlist.css'
import classObj from './Classinformation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPenToSquare,faTrash,faAngleDown } from '@fortawesome/free-solid-svg-icons'
function Studentlist() {
    const [classObject,setclassObject]=useState(classObj)
   const [addStudentCheck,setadCheck]=useState(false)
   
   const[showCheckBox,changeCBstatus]=useState(false)
   const[teacherName,setTeacherName]=useState("")
   const[changedMark,setChangedMark]=useState("")
   const[showEditSign2,setEditSign2]=useState(false)
   const[finalAverage,setFinalAverage]=useState(0)
   const [newStduent,setNewStudent]=useState({

    name:"",
    id:0,
    marks:[{subject:"",mark:""}]
   })
   const [current_student,setStudent]=useState()
   const [current_Subject_for_multiple,setSubject_formultiple]=useState("")
   const [addSub,setSubjectCheck]=useState(false)
   const [showTeacher,changeTeacher]=useState(false)
   const [Subject,setSubject]=useState({
    id:0,
    subject:"",
    mark:0
   })
   const [showEditSign,setEditSign]=useState(false)
   const [checkList,setList]=useState([])
   const [currentSubject,changeSub]=useState("")
   const [topperArray,setTopper]=useState(["None"])
   const [finalTopper,setFinalTopper]=useState("")
   const [tempsubject_fortopper,settempsubject]=useState("")
   const handleChange=(event)=>{
     setNewStudent({
        ...newStduent,
        [event.target.name]:event.target.value,
        marks:[{subject:"",mark:""}]
     })

   }
  
   
    
 
 
   const handleChange2=(event)=>{

      setSubject({
        ...Subject,
        [event.target.name]:event.target.value
      })
      console.log(event.target.value)
   }
   function findElement(element){
    return element?.id===Subject?.id
   }
   
   const submitNewSubject=(event)=>{
       if(Subject.subject!=='None'){
         event.preventDefault()
        
      let current_Student=classObject.students?.find(findElement,Subject?.id)
      
      
     
      if(current_Student?.marks[0]?.subject===''){
        console.log("Entered first")
        current_Student.marks?.splice(0,1,{subject:Subject.subject,mark:Subject.mark})
       console.log(classObject)
        // setSubject({
            
        //     subject:"",
        //     mark:0
        // })
      
      }
      else{
        let new_check=true
        current_Student?.marks?.forEach((item,index)=>{
            if(item.subject===Subject.subject){
                new_check=false
            }
        })

        if(new_check){
            console.log("Its true")
           console.log("Subject",Subject)
            
           let new_student=classObject.students.find(findElement)?.marks
           console.log("new student",new_student)
           new_student?.push({subject:Subject.subject,mark:Subject.mark})
            console.log(classObj)
            //  setSubject({
                
            //      subject:"",
            //      mark:0
            //  })
        }
        else{
            alert("Subject already existing")

        }
      }
    }
      setSubject({
        id:0,
        subject:"",
        mark:0
    }) 
    
   }

   const submitNewStudent=(event)=>{
    event.preventDefault()
     let current_id=newStduent.id
     let currentnum=parseInt(current_id)
     if(currentnum>100&&newStduent.id!==""&&newStduent.name!==""){

    

     let check=false
     classObject.students.forEach((item,index)=>{
        if(item.id===current_id){
           check=true
        }
     })
       if(check){
        alert("This id is already existing")
       }
       else{
        
        classObject.students.push(newStduent)
        console.log(classObj.students)
        setNewStudent({
            name:"",
            id:0,
            marks:[{subject:"",mark:""}]
        })
       }
    }
    
   }
   
   const deleteItm=()=>{
    
    classObj.students.splice(10)
    console.log(classObj.students)
   }
  //Edit for multiple students
  const changeEditfunc=()=>{
    setEditSign(!showEditSign)
 }
 const changeCheckBox=(event)=>{
    
    if(event.target.checked===true){
        let new_id=event.target.value
       let checkBox_student=classObject.students.find((e)=>{
            return e.id===new_id
        })
        let check_for_subject=false
        checkBox_student.marks.forEach((element,index)=>{
            if(element.subject===current_Subject_for_multiple){
                check_for_subject=true
            }

        })
        console.log("Check for subject",check_for_subject)
        if(check_for_subject){
            
            checkList.push(checkBox_student)
            console.log(checkList)
        }
        else{
            alert("This subject is not present for this student")
        }
    }
    else{
        let new_id=event.target.value
        let filter_list=checkList.filter((e)=>{
            return e.id!==new_id
        })
        setList(filter_list)

    }

   
 }
 
 const changeSubject=(event)=>{
    changeSub(event.target.value)
 }
 const checkSubject=(subject,elementIndex)=>{
    if(window.confirm("Do you want to change mark for students")){
        setChangedMark(window.prompt("Enter Mark"))
       setSubject_formultiple(subject)
        changeCBstatus(true)
        alert("Select students")
    }
   
   
 }
 const proceedWithChange=()=>{
    
       classObject.students.forEach((element,elemindex)=>{
         checkList.forEach((item,index)=>{
            if(element.id===item.id){
                console.log("item.id",item.id)
                classObject.students[elemindex].marks.find((e)=>{
                    return e.subject===current_Subject_for_multiple
                }).mark=changedMark
            }
         })
       })
        setChangedMark("")
        alert("Mark Changed")
        changeCBstatus(false)
 }
 const cancelChange=()=>{
      setList([])
      changeCBstatus(false)
 }
 

 const handleChange3=(event)=>{
     setTeacherName(event.target.value)
 }
 const changeTeacherName=(event)=>{
    event.preventDefault()
    classObject.teacherName=teacherName
    console.log(classObj.teacherName)
    setTeacherName("")
    changeTeacher(false)
 }
 const deleteSubject=(elementId,index,elementIndex)=>{
    let input=window.confirm("Do you want to delete this subject ?")
    if(input){
      let new_obj={...classObject}
      new_obj.students[elementIndex].marks.splice(index,1)
      setclassObject(new_obj)
    }
    


 }
 const deleteStudent=(elementIndex)=>{
    let input=window.confirm("Do you want to delete this Student ?")
    if(input){
        let new_std={...classObject}
        new_std.students.splice(elementIndex,1)
        setclassObject(new_std)
    }
 }
 
 classObject.students.forEach((element,index)=>{
    element.marks.forEach((item,itemIndex)=>{
      if(topperArray.includes(item.subject)===false&&item.subject!==""){
         topperArray.push(item.subject)
      }
    })
})

 const findTopperfunc=(event)=>{
    if(event.target.value!=="None"){
         settempsubject(event.target.value)
    }
   
 }
 const submitTopper=(event)=>{
     event.preventDefault()
     let temp_topper=""
     let top_mark=0
     classObject.students.forEach((element,mainindex)=>{
        element.marks.forEach((item,index)=>{
            if(item.subject===tempsubject_fortopper){
                 if(item.mark>top_mark){
                    top_mark=item.mark
                    temp_topper=element.name
                 }
            }
        })
     })
     setFinalTopper(temp_topper)
 }
 const [avgSubject,setAvgSubject]=useState("")
 const editAvgSubject=(event)=>{
      setAvgSubject(event.target.value)
 }
 const submitAvgMark=(event)=>{
     event.preventDefault()
     let sum=0
     let studentMark=[]
     classObject.students.forEach((element,elemindex)=>{
        element.marks.forEach((item,index)=>{
          if(item.subject===avgSubject){
           studentMark.push(item.mark)
          }
        })
     })
     
     console.log(studentMark)
     for(let i=0;i<studentMark.length;i++){
        sum=sum+parseFloat(studentMark[i])
     }
     setFinalAverage(sum/studentMark.length)
 }
 const sortClassobject=(event)=>{
    
        if(event.target.value==="1"){
        let temp_Obj={...classObject}
        temp_Obj.students.sort((a,b)=>{
             if(a.name<b.name){
                return -1
             }
        })
       setclassObject(temp_Obj)
        console.log(classObject.students)
       }
        else if(event.target.value==="2"){
           let temp_Obj={...classObject}
           
           temp_Obj.students.sort((a,b)=>{
                 if(a.id<b.id){
                    return -1
                 }
           })
           setclassObject(temp_Obj)
        }
        
 }
  return (
    <div className='class-container'>
        
       <div className="class-details">
             <div className="class-options">
                <select onChange={sortClassobject} className='sort-input'>
                    
                    <option value="2">Sort by Id</option>
                    <option value="1">Sort by Name</option>
                </select>
             </div>
            
            
            <div className="class-name">
              <h4>Classname: <span className='class-name-span'>{classObject.name}</span></h4>
            </div>
           
            <div className="teacher-name">
                <h4>Teacher Name: <span className='class-name-span'>{classObject.teacherName}</span> </h4>
                <button onClick={()=>{changeTeacher(!showTeacher)}} className="edit-btn">Edit</button>
                <form className={showTeacher?"teacher-options":"no-display"} onSubmit={changeTeacherName}>
                
                 <input type="text" className="input-teacher" value={teacherName} placeholder='name' onChange={handleChange3}/>
                 <button type='submit' className>Ok</button>

                </form>
                
            </div>
            <div className="add-student-container">
               
                <div className="add-student-link">
                    <button  onClick={()=>{setadCheck(!addStudentCheck)}} >Add Student<FontAwesomeIcon icon={faAngleDown} className="fa-angle-down"></FontAwesomeIcon></button>
                </div>
                <form className={addStudentCheck?"add-student-input":"no-display"} onSubmit={submitNewStudent}>
                    
                    <input type="number" placeholder='Id' name='id' value={newStduent.id} onChange={handleChange}/>
                    <input type="text" placeholder='name' name='name' value={newStduent.name} onChange={handleChange}/>
                    <button >Enter</button>    
                    
                    
                </form>
                <div className="add-student-link">
                    <button  onClick={()=>{setSubjectCheck(!addSub)}} >Add Subject <FontAwesomeIcon icon={faAngleDown} className="fa-angle-down"></FontAwesomeIcon></button>
                </div>
                
                <form className={addSub?"add-student-input":"no-display"} onSubmit={submitNewSubject} >
                    {/* <input type="number" placeholder='Id' name='id' value={Subject.id} onChange={handleChange2}/> */}
                    <select name="id" value={Subject.id} onChange={handleChange2} className="input-select" >
                         {
                            
                            classObject.students.map((element,index)=>{
                                 
                                return(
                                    <option value={element.id} key={index}>{element.id}({element.name})</option>
                                )
                               
                            })
                         }
                    </select>
                    {/* <input type="text" placeholder='Subject' name='subject' value={Subject.subject} onChange={handleChange2}/> */}
                    <select name="subject" id="" value={Subject.subject} onChange={handleChange2} className="input-select">
                        <option value="None">None</option>
                        <option value="English">English</option>
                        <option value="Maths">Maths</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Computer">Computer</option>
                        <option value="Biology">Biology</option>
                        <option value="Sociology">Sociology</option>
                        <option value="History">History</option>
                        <option value="Economics">Economics</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Malayalam">Malayalam</option>
                    </select>
                    <input type="number" placeholder='Mark' name='mark'value={Subject.mark}  onChange={handleChange2}/>
                    <button >Add</button>    
                </form>
                <div className="add-student-link">
                    <button onClick={changeEditfunc}>Find Topper <FontAwesomeIcon icon={faAngleDown} className="fa-angle-down"></FontAwesomeIcon></button>
                </div>
                <form action="" className={showEditSign?"add-student-input":"no-display"} onSubmit={submitTopper}>
                    <select name="subject" id="" className="input-select" onChange={findTopperfunc} >
                       {
                        
                        topperArray.map((element,index)=>{
                            return(
                                <option key={index}>{element}</option>
                            )
                        })
                        
                       }

                    </select>
                    <button type='submit'>OK</button>
                    <div className="div">
                        <p>Topper Display: {finalTopper}</p>
                    </div>
                </form>
                <div className="add-student-link">
                    <button onClick={()=>{setEditSign2(!showEditSign2)}}>Find Topper <FontAwesomeIcon icon={faAngleDown} className="fa-angle-down"></FontAwesomeIcon></button>
                </div>
                <form action="" className={showEditSign2?"add-student-input":"no-display"} onSubmit={submitAvgMark}>
                    <select name="subject" id="" className="input-select" onChange={editAvgSubject} >
                       {
                        
                        topperArray.map((element,index)=>{
                            return(
                                <option key={index}>{element}</option>
                            )
                        })
                        
                       }

                    </select>
                    <button type='submit' >OK</button>
                    <div className="div">
                        <p>Average: {finalAverage}</p>
                    </div>
                </form>
                <div className={showCheckBox?"select-container":"no-display"} >
                    <div className="des">
                        <p>Do you want apply change?</p>
                    </div>
                    <div className="select-buttons">
                     <button onClick={proceedWithChange}>
                        Ok
                     </button>
                     <button onClick={cancelChange}>
                        Cancel
                     </button>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Mark</th>
                    </tr>
                </thead>
                <tbody>
                 {
                    classObj.students.map((element,elementIndex)=>{
                        
                        
                        return(
                            <tr key={elementIndex}>
                               
                              <td>
                                <FontAwesomeIcon icon={faTrash} className="fa-trash" onClick={()=>{deleteStudent(elementIndex)}}/>
                              <input type="checkbox" value={element.id} onClick={changeCheckBox} className={showCheckBox?"":"no-display"}/>
                                {element.id}</td>
                              <td>{element.name}</td>
                               <td>
                                {element.marks.map((item,index)=>{
                                   
                                
                                    return(
                                        <>
                                        <p key={index}>{item.subject===""?"none":item.subject}<FontAwesomeIcon icon={faPenToSquare} className="pen-to-square-sub" onClick={()=>{checkSubject(item.subject,element.id,index)}}/> <button className="trash-in"  onClick={()=>{deleteSubject(element.id,index,elementIndex)}}><FontAwesomeIcon icon={faTrash} className='trash-icon'/></button></p>
                                        
                                        </>
                                    )
                                 
                                })}


                               </td>
                               <td>
                                
                                {element.marks.map((item,index)=>{
                                    return(
                                        
                                        
                                        
                                    
                                        <p key={index}>{item.mark===0?"none":item.mark} <FontAwesomeIcon icon={faPenToSquare} className="pen-to-square" onClick={()=>{changeSubject(item.subject)}} /> </p>
                                        
                                    )
                                    
                                })}
                               </td>
                            </tr>
                        )
                    })
                 }
                </tbody>
            </table>
        </div> 
     
    </div>
  )
}

export default Studentlist

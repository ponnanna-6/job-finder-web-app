import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {
    Login,
    Register,
    AddJob,
    EditJob,
    JobsList,
    JobsDetail,
    NotFound
} from '../src/pages'

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<JobsList/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/addjob' element={<AddJob/>}></Route>
                <Route path='/editjob' element={<EditJob/>}></Route>
                <Route path='/list/:id' element={<JobsDetail/>}></Route>
                <Route path='/list' element={<JobsList/>}>
                    <Route index element={<JobsList/>}/>
                    <Route path=':id' element={<JobsDetail/>}/>
                </Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
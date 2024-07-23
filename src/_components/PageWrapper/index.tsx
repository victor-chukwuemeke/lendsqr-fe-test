import React, { memo, ReactNode, useState } from 'react'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import Sidebar from '../../_navigation/Sidebar'
import Header from '../../_navigation/Header'

interface PageWrapperProps {
    children: ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = memo(({ children }) => {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const openSideBar = () => {
        setSideBarOpen(true)
    }

    const closeSideBar = () => {
        setSideBarOpen(false)
    }

    return (
        <div className="app-wrapper h-100 w-100">
            <Header sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
            <div className="h-100 d-flex contents">
                <Sidebar
                    sideBarOpen={sideBarOpen}
                    closeSideBar={closeSideBar}
                />
                <div className="w-100 contents-inner">{children}</div>
            </div>
        </div>
    )
})

export default PageWrapper

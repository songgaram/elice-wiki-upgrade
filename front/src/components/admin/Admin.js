import React, { useState, useEffect, createContext } from "react";

import King from "./King";

const User = () => {
    const AdminContext = createContext();

    return (
        <>
            <AdminContext.Provider>
                <King />
            </AdminContext.Provider>
        </>
    );
};

export default User;

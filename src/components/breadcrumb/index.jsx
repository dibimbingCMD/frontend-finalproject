
import React, { useEffect, useState } from "react";

import './style.scss'

export default function BreadCrumb({page}) {
    return (
        <div className="breadcrumb-section">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{page}</li>
                </ol>
            </nav>
        </div>

    )
}
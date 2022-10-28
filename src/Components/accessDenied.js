import React, { useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button, Modal, Container } from "react-bootstrap";
import { Link, useSearchParams, useLocation } from "react-router-dom";

require("dotenv").config();

export default function comingSoon() {

    return (
        <div className="content-body">
            <div className="container-fluid">
                <div className="row no-gutter overflow-h">
                    <div className="container d-flex justify-content-center align-self-center">
                        <div className="con-wl">
                            <h3>Coming Soon</h3>
                            <span className="mt-3 fw-500">We're currently working on this section. Stay tuned for something amazing!</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
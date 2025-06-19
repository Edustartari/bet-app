import React from 'react'
import 'styles/pages/TermsOfUse.css'
import { Link } from "react-router-dom";

const TermsOfUse = (props) => {
    return (
        <div className='terms-background'>
            <div className="terms-header-button-container">
                <Link to="/settings">
                    <div className="terms-header-icon">
                        <span className="material-icons">arrow_back</span>
                        <span className="terms-header-icon-text">BACK</span>
                    </div>
                </Link>
            </div>
            <div className='terms-content'>
                <h1>Terms of Use</h1>
                <p>Please read these terms of use carefully before using our application.</p>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using our application, you agree to be bound by these terms.</p>
                <h2>2. Changes to Terms</h2>
                <p>We may modify these terms at any time. Your continued use of the application constitutes acceptance of the new terms.</p>
                <h2>3. User Conduct</h2>
                <p>You agree to use the application only for lawful purposes and in accordance with these terms.</p>
                <h2>4. Termination</h2>
                <p>We may terminate or suspend your access to the application at any time, without prior notice or liability.</p>
                <h2>5. Governing Law</h2>
                <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate.</p>
            </div>
        </div>
    )
}

export default TermsOfUse;
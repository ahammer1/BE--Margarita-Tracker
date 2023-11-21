import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import AgeConfirmationModal from './AgeConfirmation';

function Signin() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSignInClick = () => {
    // Show the confirmation modal
    setShowConfirmationModal(true);
  };

  const handleConfirmation = () => {
    // Close the confirmation modal and proceed with sign-in logic
    setShowConfirmationModal(false);
    signIn();
  };

  const handleModalClose = () => {
    // Close the confirmation modal without proceeding with sign-in
    setShowConfirmationModal(false);
  };

  return (
    <div className="text-center d-flex flex-column justify-content-center align-items-center">
      <h1>Hi there!</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={handleSignInClick}>
        Sign In
      </Button>

      {/* Age Confirmation Modal */}
      <AgeConfirmationModal
        show={showConfirmationModal}
        onHide={handleModalClose}
        onConfirm={handleConfirmation}
      />
    </div>
  );
}

export default Signin;

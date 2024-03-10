// RegisterPage.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {Step1} from './Step1';
import {Step2} from './Step2';
import {Step3} from './Step3';

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    navigate(`/register/step${currentStep + 1}`);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    navigate(`/register/step${currentStep - 1}`);
  };

  return (
    <Routes>
      <Route path="/step1" element={<Step1 onNextStep={handleNextStep} />} />
      <Route path="/step2" element={<Step2 onNextStep={handleNextStep} onPrevStep={handlePrevStep} />} />
      <Route path="/step3" element={<Step3 onPrevStep={handlePrevStep} />} />
    </Routes>
  );
};


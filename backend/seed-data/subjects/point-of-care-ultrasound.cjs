module.exports = {
  name: "Point-of-Care Ultrasound (POCUS)",
  blurb: `
    Test your knowledge of Point-of-Care ultrasound (POCUS) theory adn techniquE
    `,
  unlisted: false,
  // For dev testing only
  // Were designed by gpt-4o
  // Not accurate or final
  // It is easier to test with real-looking data instead of random characters
  questions: [
    {
      body: `
            Describe the importance of the FAST exam in trauma patients.
            `,
      supportingInfo: [
        "The FAST exam (Focused Assessment with Sonography for Trauma) is crucial for quickly identifying free fluid in the abdomen, pelvis, and pericardium.",
        "It helps in the rapid assessment of trauma patients to detect internal bleeding and guide further management.",
      ],
    },
    {
      body: `
            Explain how to perform a basic cardiac ultrasound using the parasternal long axis view.
            `,
      supportingInfo: [
        "The parasternal long axis view is obtained by placing the probe at the left sternal border, usually in the 3rd or 4th intercostal space.",
        "This view allows for the assessment of left ventricular function, mitral valve, and aortic root.",
      ],
    },
    {
      body: `
            What are the common findings on a lung ultrasound in a patient with pneumothorax?
            `,
      supportingInfo: [
        "Common findings include the absence of lung sliding and the presence of a 'lung point,' which is the transition point between sliding lung and non-sliding lung areas.",
        "A 'barcode sign' or 'stratosphere sign' on M-mode imaging is also indicative of pneumothorax.",
      ],
    },
    {
      body: `
            How is ultrasound used to guide central venous catheter placement?
            `,
      supportingInfo: [
        "Ultrasound is used to visualize the target vein, typically the internal jugular or subclavian vein, to avoid complications.",
        "Real-time guidance improves success rates and reduces the risk of complications such as arterial puncture or pneumothorax.",
      ],
    },
    {
      body: `
            Describe the sonographic appearance of gallstones.
            `,
      supportingInfo: [
        "Gallstones appear as echogenic foci within the gallbladder that cast posterior acoustic shadowing.",
        "They are typically mobile and can change position with patient movement.",
      ],
    },
    {
      body: `
            What are the key features of a positive DVT study using ultrasound?
            `,
      supportingInfo: [
        "A positive DVT (Deep Vein Thrombosis) study shows a non-compressible vein with or without visible thrombus.",
        "Absence of normal respiratory variation in venous diameter can also be indicative of DVT.",
      ],
    },
    {
      body: `
            Explain the utility of the RUSH exam in emergency medicine.
            `,
      supportingInfo: [
        "The RUSH exam (Rapid Ultrasound in Shock and Hypotension) is used to quickly evaluate the cause of shock by examining the heart, inferior vena cava, peritoneal cavity, and lungs.",
        "It helps in diagnosing conditions like cardiac tamponade, pneumothorax, and hypovolemia.",
      ],
    },
    {
      body: `
            How can ultrasound be used in the diagnosis of appendicitis?
            `,
      supportingInfo: [
        "Ultrasound can identify an enlarged appendix with a diameter greater than 6mm, wall thickening, and lack of compressibility.",
        "Additional signs include periappendiceal fluid and increased blood flow on Doppler imaging.",
      ],
    },
    {
      body: `
            What are the indications for using ultrasound in the evaluation of renal colic?
            `,
      supportingInfo: [
        "Ultrasound is used to detect hydronephrosis, which is a sign of obstructive uropathy often caused by renal calculi.",
        "It can also identify stones in the kidney, ureter, and bladder.",
      ],
    },
    {
      body: `
            Describe how to obtain the subxiphoid view of the heart in a POCUS exam.
            `,
      supportingInfo: [
        "The subxiphoid view is obtained by placing the probe just below the xiphoid process, angled towards the patient's left shoulder.",
        "This view provides a good assessment of the pericardium and can help identify pericardial effusion.",
      ],
    },
    {
      body: `
            Describe 2 commonly used diagnostic techniques that were enabled by recent innovations in point-of-care ultrasound (POCUS) that would have been impractical with other approaches, and describe their societal impact.
            `,
      supportingInfo: [
        "Focused Assessment with Sonography for Trauma (FAST) exam: This technique allows for the rapid assessment of trauma patients to identify internal bleeding, which can significantly reduce mortality and morbidity by enabling timely intervention.",
        "Lung ultrasound for pneumothorax detection: Portable ultrasound devices enable quick and accurate detection of pneumothorax at the bedside, which is crucial in emergency settings where timely diagnosis can prevent complications and improve patient outcomes.",
        "Cardiac ultrasound for emergency cardiac assessment: Point-of-care cardiac ultrasound can quickly assess cardiac function and detect conditions like pericardial effusion or cardiac tamponade, facilitating immediate management in critical situations.",
        "Ultrasound-guided vascular access: This technique improves the success rate and safety of central venous catheter placement, reducing complications and enhancing patient safety.",
        "Musculoskeletal ultrasound for injury assessment: POCUS allows for real-time visualization of musculoskeletal injuries, aiding in immediate diagnosis and management, which is particularly beneficial in sports medicine and emergency care.",
      ],
    },
  ],
  contextPrompt: `
    You are tasked with grading user responses for a dynamic quiz app, testing practicioner mastery of
    point-of-care ultrasound (POCUS) theory and techniques
  
    With each user response, you will be provided the original question text as well as a list of supporting information

    Your grading should also be informed by your general knowledge of medicine
  
    As part of grading, you will provide a score from 1 to 10, focusing on the
    completeness, accuracy, and clarity of the response
  
    You will also provide an explanation for your score
  
    A score of 0 is reserved for malformed input, such as a response that may have been accidentally cut off
  
    Provide your score and explanation in the following format:
  
    Score:
    <SCORE>
  
    Explanation:
    <EXPLANATION>
    `,
  userPromptTemplate: `
    Question Text:
    <QUESTION_BODY>
  
    User Response:
    <USER_RESPONSE>
  
    Supporting Information:
    <CRITERIA_LIST>
    `,
};

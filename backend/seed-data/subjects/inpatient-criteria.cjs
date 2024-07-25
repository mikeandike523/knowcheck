module.exports = {
  name: "Inpatient Criteria",
  blurb: `
  Test your decision-making for the intake of an inpatient under specific diagnoses, based on well known criteria.
  `.trim(),
  unlisted: false,
  questions: [
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "COPD with Acute Exacerbation"?',
      supportingInfo: [
        "Persistent dyspnea requiring 2 doses of SABAs before admission and at least 1 criteria point: SaO2 < 90% and the patient's baseline or PaO2 < 50mmHg, Accessory muscle usage, tripodding, paradoxical chest wall movement or acute or progressive central cyanosis",
        "High risk for adverse events supported by 1 or more clinical risk factors: FEV1 < 50%, Chronic Respiratory Failure w/ home O2, intubation w/in 1-yr, cor pulmonale, pneumonia or acute or chronic respiratory failure, severe psychiatric illness or immunodeficiency",
        "Requiring ventilatory support (invasive or non-invasive)",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Pneumonia"?',
      supportingInfo: [
        "Documented diagnosis of Pneumonia, confirmed by imaging, and has at least 1 intervention of: IV antibiotics, PO antibiotics + IV fluids > 100ml/h and/or supplemental oxygen requirement",
        "1 or more: SaO2 <90% and below patient's baseline, PaO2 < 56 and below baseline, PCO2 45-54 + pH 7.31-7.35 or has at least 1 risk factor: COPD, acute and/or chronic heart failure",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "AKI (Acute Kidney Injury)"?',
      supportingInfo: [
        "Serum creatinine level > 3x baseline and or > 1.5x baseline & > 4mg/dL following administration of intravenous fluids",
        "Serum creatinine > 2x baseline and: new onset dialysis, or diuretic therapy > 2 doses/24hrs, or immunosuppressive therapy",
        "Plasma exchange, or IV corticosteroids, or Renal biopsy",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Developed AKI Post Admission"?',
      supportingInfo: [
        "Diagnosis of AKI (documented etiology if able), with 1 or more findings of: Oliguria < 0.5 mL/kg/h, Serum creatinine > 1.5x baseline, Serum creatinine > 3.0mg/dL increase in 48hrs, or new onset dialysis",
        "At least 1 intervention of: volume expansion, diuretic x2 dose/24hrs or new onset dialysis",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Acute Pancreatitis"?',
      supportingInfo: [
        "2 or more findings: Pancreatic abdominal pain, Amylase or lipase > 3x ULN, Pancreatitis confirmed by imaging",
        "1 risk factor: HCT >44% after aggressive fluid resuscitation, mental status change such as GCS 9-14, pancreatic duct obstruction, pleural effusion on imaging, pulmonary infiltrates on imaging",
        "Both interventions: Pain unresponsive to 2 or more days of NSAIDs, IV fluid resuscitation up to 2 days",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Atrial Fibrillation"?',
      supportingInfo: [
        "Persistent atrial fibrillation confirmed on ECG that remains uncontrolled (rate exceeds 110)",
        "The initiation of one of the following anti-arrhythmic agents: amiodarone, disopyramide, dofetilide, sotalol, dronedarone, mexiletine, or quinidine",
        "Repeat or failed cardioversion necessary",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Hypocalcemia"?',
      supportingInfo: [
        "Acquired after admission AND < 7.5 mg/dL AND < baseline",
        "5.0-7.4 mg/d, persistent symptoms (carpopedal spasm, flaccid paralysis, muscle weakness, paresthesia, perioral numbness, or tetany)",
        "Calcium replacement",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Hypercalcemia"?',
      supportingInfo: [
        "Ca level of 12.1-13.9 with persistent symptoms (abdominal pain, mental status changes, Glasgow Coma Scale (GCS) 9-14, nausea, nephrolithiasis, or vomiting)",
        "Intervention of either Bisphosphonate, Corticosteroid, or Saline hydration (> 100ml/hr)",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Hypokalemia"?',
      supportingInfo: [
        "Diagnosis of hypokalemia along with a K+ level < 2.5 and without electrocardiogram changes with treatment including K+ repletion (IV or PO)",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Hyperkalemia"?',
      supportingInfo: [
        "K+ level exceeds 6",
        "Treatment provided: Kayexalate, Calcium chloride, Calcium gluconate or Diuretic",
        "K+ level exceeds 5.4 with associated ECG changes, including AV dissociation, loss of P wave, multifocal PVCs, ventricular fibrillation, ventricular tachycardia or widening QRS",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "UTI"?',
      supportingInfo: [
        "Hypotension or any hemodynamic persistence/instability/lability",
        "Altered mental status that is severe and persistent",
        "Persistence or worsening of clinical finding (e.g., fever, pain, dehydration, vomiting) despite observation care",
        "Pregnancy with suspected pyelonephritis",
        "Kidney transplant recipient with suspected pyelonephritis",
        "Significant uropathy (e.g., obstruction including stones, moderate to severe vesicoureteral reflux)",
        "Suspected infection of an indwelling prosthetic device, stent, implant, or graft",
        "Bladder emptying impaired (e.g., bladder outlet obstruction)",
        "Renal or perinephric abscess",
        "Acute kidney injury (stage 2 or 3)",
        "Need for ongoing IV hydration support (e.g., inability to maintain oral hydration) or symptomatic medication despite initial care",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "COPD"?',
      supportingInfo: [
        "Persistent, multiple, or profound hemodynamic or respiratory abnormalities",
        "New need for positive pressure or high flow oxygen, intubation and mechanical ventilation",
        "Clinical signs of respiratory fatigue (e.g., use of respiratory accessory muscles)",
        "Altered mental status (agitation, confusion, or depressed sensorium)",
        "Sats < 90% despite inspired oxygen (FiO2) greater than 40%",
        "New-onset room-air hypoxemia (SpO2 <90% that persists despite initial care)",
        "Moderate or worse hypercarbia PaCO2 > 45 that persists despite initial care",
        "Tachypnea, with rate of >24 that persists despite initial care",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Chest Pain"?',
      supportingInfo: [
        "Unstable angina is no longer 'chest pain'",
        "Use a condition diagnosis if possible",
        "Abnormal labs or ECG suggest a diagnostic condition",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Back Pain"?',
      supportingInfo: [
        "Acute, severe, and focal neurological deficits with need for emergent surgery",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Abdominal Pain"?',
      supportingInfo: [
        "Signs or symptoms of peritonitis",
        "Lab or study findings suggestive of severe disease",
        "Worsening signs or symptoms despite ED and OBS treatment",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Headache"?',
      supportingInfo: [
        "ED unable to rule out severe disease in ER",
        "Ataxia, nystagmus, or syncope present",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Nausea/Vomiting"?',
      supportingInfo: ["Signs and symptoms of shock despite ED treatment"],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Dizziness"?',
      supportingInfo: [
        "Always requires a different primary diagnosis such as a seizure, CVA or other focal neurological condition",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Syncope"?',
      supportingInfo: [
        ">85 years old",
        "Cardiac or focal neurological findings",
        "Two or more findings suggestive of significant disease",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "Gait Dysfunction"?',
      supportingInfo: [
        "Admission status requires a significant other diagnosis which then becomes the primary diagnosis",
      ],
    },
    {
      body: 'What are the criteria indicating that a patient should be admitted as an inpatient under the diagnosis "TIA"?',
      supportingInfo: [
        "Focal Neuro Findings",
        "Hemodynamic Instability",
        "Imminent Vascular Intervention",
      ],
    },
  ],

};

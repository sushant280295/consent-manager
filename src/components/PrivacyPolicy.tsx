import React from 'react';
import { Shield, AlertCircle, Check } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold flex items-center text-blue-800">
          <Shield size={18} className="mr-2" />
          Privacy Policy
        </h3>
        <p className="text-sm text-blue-800 mt-1">
          In compliance with the Digital Personal Data Protection (DPDP) Act, 2023
        </p>
      </div>
      
      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold text-gray-800">Introduction</h3>
        <p className="text-gray-700">
          This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal data in accordance with the Digital Personal Data Protection (DPDP) Act, 2023 of India ("DPDP Act"). By using our services, you consent to the practices described in this policy.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Personal Data We Collect</h3>
        <p className="text-gray-700">
          We may collect the following categories of personal data:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Identity data (name, username, email address)</li>
          <li>Contact data (email address, phone number, postal address)</li>
          <li>Technical data (IP address, browser type, device information)</li>
          <li>Usage data (how you use our website and services)</li>
          <li>Marketing preferences</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Purpose of Data Processing</h3>
        <p className="text-gray-700">
          We process your personal data for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our services</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information to improve our services</li>
          <li>To monitor the usage of our services</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To provide you with news, special offers and general information about other goods, services and events</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Legal Basis for Processing</h3>
        <p className="text-gray-700">
          Under the DPDP Act, we process your personal data based on:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Your consent</li>
          <li>Performance of a contract</li>
          <li>Compliance with legal obligations</li>
          <li>Protection of vital interests</li>
          <li>Public interest or exercise of official authority</li>
          <li>Legitimate interests</li>
        </ul>
        
        <div className="bg-yellow-50 p-4 rounded-lg mt-6 border border-yellow-100">
          <div className="flex items-start">
            <AlertCircle size={20} className="text-yellow-600 mr-2 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800">Processing of Children's Data</h4>
              <p className="text-sm text-yellow-700 mt-1">
                In accordance with the DPDP Act, we require verified parental consent before processing personal data of children (individuals below the age of 18 years). We implement age verification measures to ensure compliance with this requirement.
              </p>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Your Rights Under DPDP Act</h3>
        <p className="text-gray-700">
          The DPDP Act provides you with certain rights regarding your personal data, including:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Check size={18} className="text-green-600 mr-2 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Right to Information</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You have the right to obtain information about the personal data being processed about you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Check size={18} className="text-green-600 mr-2 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Right to Correction</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You can request the correction of inaccurate or incomplete personal data.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Check size={18} className="text-green-600 mr-2 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Right to Erasure</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You can request the deletion of your personal data under certain circumstances.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Check size={18} className="text-green-600 mr-2 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Right to Grievance Redressal</h4>
                <p className="text-sm text-gray-600 mt-1">
                  You have the right to file a complaint with us or the Data Protection Board.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Data Security</h3>
        <p className="text-gray-700">
          We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Encryption of data during transmission</li>
          <li>Regular security assessments</li>
          <li>Access controls and authentication procedures</li>
          <li>Staff training on data protection</li>
          <li>Incident response procedures</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Data Retention</h3>
        <p className="text-gray-700">
          We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-6">Contact Us</h3>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="text-gray-700">Email: dpo@example.com</p>
          <p className="text-gray-700">Phone: +91 XXXXX XXXXX</p>
          <p className="text-gray-700">Address: [Your Company Address]</p>
        </div>
      </div>
    </div>
  );
};
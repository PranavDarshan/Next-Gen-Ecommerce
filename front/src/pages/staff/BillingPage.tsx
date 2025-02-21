import React from 'react';
import { BillingForm } from '../../components/staff/BillingForm';

export function BillingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
        Billing
      </h1>
      <div className="card p-6">
        <BillingForm />
      </div>
    </div>
  );
}
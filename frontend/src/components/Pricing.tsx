import React, { useState } from 'react';
import { Check, X, Zap, Shield, Star } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  // Theme configuration - easily adaptable to existing themes
  const theme = {
    primary: 'indigo', // Change this to match your brand (blue, purple, emerald, etc.)
    font: 'Rubik, sans-serif',
  };

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for testing the waters and personal projects.',
      features: [
        { name: '1 Project', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Community Support', included: true },
        { name: 'Marketing Automation', included: false },
        { name: 'Custom Domain', included: false },
        { name: 'Priority 24/7 Support', included: false },
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Pro',
      price: isAnnual ? 29 : 39,
      description: 'For power users and businesses scaling up.',
      features: [
        { name: 'Unlimited Projects', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Priority Email Support', included: true },
        { name: 'Marketing Automation', included: true },
        { name: 'Custom Domain', included: true },
        { name: 'Priority 24/7 Support', included: true },
      ],
      cta: 'Upgrade to Pro',
      highlight: true,
      badge: 'Most Popular',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ fontFamily: theme.font }}>
      {/* Import Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');`}
      </style>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className={`text-base font-semibold tracking-wide uppercase text-${theme.primary}-600 mb-2`}>
          Pricing
        </h2>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight sm:text-5xl">
          Plans for every stage of growth
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Simple, transparent pricing. No hidden fees.
        </p>

        {/* Toggle */}
        <div className="flex justify-center items-center space-x-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative rounded-full w-14 h-8 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme.primary}-500 ${isAnnual ? `bg-${theme.primary}-600` : 'bg-slate-200'}`}
          >
            <span
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow transform transition-transform duration-200 ease-in-out ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Yearly <span className={`ml-1 text-${theme.primary}-600 text-xs font-bold uppercase bg-${theme.primary}-100 px-2 py-0.5 rounded-full`}>Save 25%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Container */}
      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2 items-start">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl bg-white transition-all duration-300 hover:shadow-xl flex flex-col
              ${plan.highlight 
                ? `ring-2 ring-${theme.primary}-600 shadow-lg scale-105 z-10 lg:-mt-4 lg:mb-4` 
                : 'border border-slate-200 shadow-sm hover:-translate-y-1'
              }
            `}
          >
            {plan.highlight && (
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-${theme.primary}-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm tracking-wide`}>
                {plan.badge}
              </div>
            )}

            <div className="p-8 flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
              
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-extrabold text-slate-900">${plan.price}</span>
                <span className="text-slate-500 ml-2 font-medium">/month</span>
              </div>
              {isAnnual && plan.price > 0 && (
                <p className={`text-sm text-${theme.primary}-600 font-medium mb-6 -mt-4`}>
                  Billed ${plan.price * 12} yearly
                </p>
              )}

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {feature.included ? (
                        <div className={`p-0.5 rounded-full bg-${theme.primary}-100 text-${theme.primary}-600`}>
                            <Check size={14} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="p-0.5 rounded-full bg-slate-100 text-slate-400">
                             <X size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className={`ml-3 text-sm ${feature.included ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <button
                className={`w-full py-4 px-6 rounded-xl text-center font-bold text-lg transition-all duration-200 transform active:scale-95
                  ${plan.highlight
                    ? `bg-${theme.primary}-600 text-white hover:bg-${theme.primary}-700 shadow-md hover:shadow-lg`
                    : `bg-slate-100 text-slate-900 hover:bg-slate-200 hover:text-slate-950`
                  }
                `}
              >
                {plan.cta}
              </button>
              {plan.price === 0 && (
                 <p className="text-xs text-center text-slate-400 mt-4">No credit card required</p>
              )}
              {plan.highlight && (
                 <p className="text-xs text-center text-slate-400 mt-4">30-day money-back guarantee</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Trust Badges / Social Proof */}
      <div className="mt-16 text-center">
         <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-6">Trusted by developers at</p>
         <div className="flex justify-center gap-8 opacity-50 grayscale mix-blend-multiply">
            {/* Simple geometric logo placeholders */}
            <div className="h-8 w-24 bg-slate-400 rounded"></div>
            <div className="h-8 w-24 bg-slate-400 rounded"></div>
            <div className="h-8 w-24 bg-slate-400 rounded"></div>
            <div className="h-8 w-24 bg-slate-400 rounded hidden sm:block"></div>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
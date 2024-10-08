// Define the Step type
type Step = {
  title: string;
  date: string;
  description: string;
  isActive: boolean;
};

interface OrderTrackingProps {
  steps: Step[];
}

function OrderTracking({ steps }: OrderTrackingProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
          <div className="w-full max-w-3xl mx-auto">
        
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${step.isActive ? 'is-active' : ''}`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 ${step.isActive ? 'group-[.is-active]:bg-emerald-500 text-emerald-50' : 'text-slate-500'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}
                  >
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                      <path
                        fillRule="nonzero"
                        d={
                          step.isActive
                            ? 'M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z'
                            : 'M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z'
                        }
                      />
                    </svg>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900">{step.title}</div>
                      <time className={`text-xs font-medium ${step.isActive ? 'text-indigo-500' : 'text-amber-500'}`}>{step.date}</time>
                    </div>
                    <div className="text-slate-500">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderTracking;


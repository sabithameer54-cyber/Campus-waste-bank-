import React from 'react';
import { X, Bell, Check, Clock, CheckCheck, Sparkles, ArrowRight, BookOpen, Calculator, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsModalOpen,
    setIsNotificationsModalOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    acceptBorrowRequest,
    acceptExchangeProposal,
  } = useApp();

  if (!isNotificationsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mt-12 animate-in fade-in slide-in-from-top-4 duration-150">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-white">Campus Notifications</h3>
              <p className="text-[11px] text-emerald-200">Requests, peer exchanges & green alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-emerald-200 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition flex items-center gap-1 font-medium"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>
            <button
              onClick={() => setIsNotificationsModalOpen(false)}
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="p-3 divide-y divide-slate-100 max-h-[75vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">No notifications yet.</div>
          ) : (
            notifications.map((notif) => {
              const isSamCalculator = notif.id === 'notif-1';
              const isPriyaExchange = notif.id === 'notif-2';

              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-xl transition ${
                    notif.read ? 'bg-white hover:bg-slate-50' : 'bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          notif.read ? 'bg-transparent' : 'bg-emerald-600'
                        }`}
                      />
                      <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-600 pl-4 mb-2 leading-relaxed">
                    {notif.message}
                  </p>

                  {/* Actionable button for Sam's calculator request */}
                  {isSamCalculator && (
                    <div className="pl-4 pt-1 flex items-center gap-2">
                      {notif.actionTaken ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Accepted: Lent to Sam (Due in 7 days)
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              acceptBorrowRequest(
                                notif.id,
                                notif.targetItemId || 'item-ec-1',
                                notif.requesterName || 'Sam Wilson'
                              )
                            }
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                          >
                            <Calculator className="w-3.5 h-3.5" />
                            <span>Accept & Share Location</span>
                          </button>
                          <button
                            onClick={() => markNotificationAsRead(notif.id)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actionable button for Priya's exchange proposal */}
                  {isPriyaExchange && (
                    <div className="pl-4 pt-1 flex items-center gap-2">
                      {notif.actionTaken ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Accepted: Swap arranged at Library
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              acceptExchangeProposal(
                                notif.id,
                                notif.targetItemId || 'item-sm-1'
                              )
                            }
                            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Accept Swap Proposal</span>
                          </button>
                          <button
                            onClick={() => markNotificationAsRead(notif.id)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
                          >
                            Review Details
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mark as read single */}
                  {!notif.read && !notif.actionable && (
                    <div className="pl-4 pt-1 text-right">
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="text-[11px] text-slate-500 hover:text-emerald-700 font-medium"
                      >
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

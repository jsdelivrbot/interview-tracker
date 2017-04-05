
function daysAgo(days) {
  return new Date( Date.now() - days*24*60*60*1000 )
}

function hoursAgo(hours) {
  return new Date( Date.now() - hours*60*60*1000 )
}

function daysFromNow(days) {
  return new Date( Date.now() + days*24*60*60*1000 )
}

function hoursFromNow(hours) {
  return new Date( Date.now() + hours*60*60*1000 )
}

const MOCK_STATE = {
  ui: {
    currentFilter: 'ACTIVE', // | 'ARCHIVED'
    selectedPosition: null,
    isEditingNewPosition: false
  },
  entities: {
    positions: {
      byId: {
        1: {
          id: 1,
          companyName: 'CloudHealth Technologies',
          position: 'FrontEnd Engineer',
          startedInterviewingAt: daysAgo(10),
          rounds: [1, 2, 3],
          offer: null,
          didTerminate: null,
          archivedAt: null
        },
        2: {
          id: 2,
          companyName: 'Airbnb',
          position: 'UX Designer',
          startedInterviewingAt:  daysAgo(14),
          rounds: [4],
          offer: null,
          didTerminate: null,
          archivedAt: null
        },
        3: {
          id: 3,
          companyName: 'CarGurus',
          position: 'Senior Software Engineer',
          startedInterviewingAt:  daysAgo(20),
          rounds: [5, 6, 7],
          offer: 1,
          didTerminate: null,
          archivedAt: null
        },
        4: {
          id: 4,
          companyName: 'Apple',
          position: 'Software Engineer',
          startedInterviewingAt:  hoursAgo(2),
          rounds: [],
          offer: null,
          didTerminate: null,
          archivedAt: null
        },
        5: {
          id: 5,
          companyName: 'Google',
          position: 'Software Engineer',
          startedInterviewingAt: daysAgo(1),
          rounds: [8],
          offer: null,
          didTerminate: null,
          archivedAt: null
        },
        6: {
          id: 6,
          companyName: 'GetHuman',
          position: 'Frontend Developer',
          startedInterviewingAt: daysAgo(38),
          rounds: [9],
          offer: null,
          didTerminate: true,
          archivedAt: hoursAgo(1)
        },
        7: {
          id: 7,
          companyName: 'Localytics',
          position: 'Frontend Developer',
          startedInterviewingAt: daysAgo(1),
          rounds: [10],
          offer: null,
          didTerminate: null,
          archivedAt: null
        },
      },
      allIds: [1, 2, 3, 4, 5, 6, 7]
    },
    rounds: {
      byId: {
        1: {
          id: 1,
          type: 'Recruiter Phone Screen',
          scheduledStartTime: daysAgo(9),
          scheduledEndTime: daysAgo(9),
          decision: 'PASSED',
          decisionReceivedAt: daysAgo(8)
        },
        2: {
          id: 2,
          type: 'Remote Pair Programming',
          scheduledStartTime: daysAgo(7),
          scheduledEndTime: daysAgo(7),
          decision: 'PASSED',
          decisionReceivedAt: daysAgo(7)
        },
        3: {
          id: 3,
          type: 'On-Site',
          scheduledStartTime: daysAgo(2),
          scheduledEndTime: daysAgo(2),
          decision: null,
          decisionReceivedAt: null
        },
        4: {
          id: 4,
          type: 'Recruiter Phone Screen',
          scheduledStartTime: daysFromNow(3),
          scheduledEndTime: daysFromNow(3),
          decision: null,
          decisionReceivedAt: null
        },
        5: {
          id: 5,
          type: 'Recruiter Phone Screen',
          scheduledStartTime: daysAgo(20),
          scheduledEndTime: daysAgo(20),
          decision: 'PASSED',
          decisionReceivedAt: daysAgo(18)
        },
        6: {
          id: 6,
          type: 'Remote Pair Programming',
          scheduledStartTime: daysAgo(13),
          scheduledEndTime: daysAgo(13),
          decision: 'PASSED',
          decisionReceivedAt: daysAgo(12)
        },
        7: {
          id: 7,
          type: 'On-Site',
          scheduledStartTime: daysAgo(1),
          scheduledEndTime: daysAgo(1),
          decision: 'PASSED',
          decisionReceivedAt: hoursAgo(3)
        },
        8: {
          id: 8,
          type: 'Recruiter Phone Screen',
          scheduledStartTime: daysAgo(1),
          scheduledEndTime: daysAgo(1),
          decision: 'REJECTED',
          decisionReceivedAt: hoursAgo(2)
        },
        9: {
          id: 9,
          type: 'Remote Pairing',
          scheduledStartTime: daysAgo(20),
          scheduledEndTime: daysAgo(20),
          decision: null,
          decisionReceivedAt: null
        },
        10: {
          id: 10,
          type: 'On-Site',
          scheduledStartTime: hoursFromNow(4),
          scheduledEndTime: hoursFromNow(4),
          decision: null,
          decisionReceivedAt: null
        },
      },
      allIds: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    offers: {
      byId: {
        1: {
          id: 1,
          baseSalary: 120000,
          receivedAt: hoursAgo(2),
          decision: null,
          decidedAt: null
        }
      },
      allIds: [1]
    }
  }
}

export default function getInitialState() {
  return MOCK_STATE;
}

import { Workspace, User, Task } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@opspilot.internal',
    role: 'reviewer',
    title: 'Operations Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    workspaceId: 'ranchers',
  },
  {
    id: 'usr-2',
    name: 'Marcus Vance',
    email: 'marcus.vance@opspilot.internal',
    role: 'technician',
    title: 'Senior Facilities Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    workspaceId: 'colabs',
  },
  {
    id: 'usr-3',
    name: 'Chef Tariq Al-Mansoor',
    email: 'tariq.mansoor@ranchers.internal',
    role: 'reporter',
    title: 'Head Kitchen Supervisor',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&auto=format&fit=crop&q=80',
    workspaceId: 'ranchers',
  },
  {
    id: 'usr-4',
    name: 'Sarah Chen',
    email: 'sarah.chen@colabs.internal',
    role: 'reviewer',
    title: 'QA & Space Infrastructure Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    workspaceId: 'colabs',
  },
  {
    id: 'usr-5',
    name: 'David Kim',
    email: 'david.kim@ranchers.internal',
    role: 'technician',
    title: 'Culinary Equipment Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    workspaceId: 'ranchers',
  },
  {
    id: 'usr-6',
    name: 'Alex Rivera',
    email: 'alex.rivera@community.internal',
    role: 'reporter',
    title: 'Campus Member & Guest Reporter',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    workspaceId: 'colabs',
  }
];

export const WORKSPACES: Workspace[] = [
  {
    id: 'ranchers',
    name: 'Ranchers Food Service',
    tagline: 'Culinary Operations & Kitchen Safety',
    description: 'Commercial kitchen management, food preparation safety, walk-in cold chain integrity, appliance maintenance, and hygiene compliance.',
    domain: 'Restaurant & Hospitality Space',
    locations: [
      'Hot Kitchen - Fryer Station 02',
      'Walk-in Chiller B',
      'Food Prep & Slicing Station',
      'Dishwashing & Sanitization Area',
      'Front Counter POS Terminal 1',
      'Dry Ingredient Storage',
      'Back Loading Dock & Grease Trap'
    ],
    categories: [
      'Kitchen Appliances',
      'Food Safety & Hygiene',
      'Cold Chain & Refrigeration',
      'Inventory Shortage',
      'Point of Sale & IT',
      'Plumbing & Drainage',
      'HVAC & Ventilation'
    ],
    teams: [
      {
        id: 'team-kitchen-ops',
        name: 'Kitchen Line & Appliances',
        workspaceId: 'ranchers',
        description: 'Commercial fryers, flat-tops, convection ovens, safety valves, burners.',
        leadName: 'David Kim',
        members: [
          { userId: 'usr-5', name: 'David Kim', role: 'Culinary Equipment Specialist', email: 'david.kim@ranchers.internal', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', activeTasksCount: 2 },
          { userId: 'usr-3', name: 'Chef Tariq Al-Mansoor', role: 'Head Supervisor', email: 'tariq.mansoor@ranchers.internal', avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&auto=format&fit=crop&q=80', activeTasksCount: 1 }
        ]
      },
      {
        id: 'team-cold-chain',
        name: 'Cold Chain & Refrigeration',
        workspaceId: 'ranchers',
        description: 'Walk-in chillers, reach-in freezers, door seals, evaporator coils, HACCP temperature sensors.',
        leadName: 'Elena Rostova',
        members: [
          { userId: 'usr-1', name: 'Elena Rostova', role: 'Operations Director', email: 'elena.rostova@opspilot.internal', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', activeTasksCount: 1 },
          { userId: 'usr-5', name: 'David Kim', role: 'Equipment Specialist', email: 'david.kim@ranchers.internal', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', activeTasksCount: 2 }
        ]
      },
      {
        id: 'team-qa-safety',
        name: 'Food Safety & Compliance',
        workspaceId: 'ranchers',
        description: 'Chemical sanitizer titration, cross-contamination prevention, food quarantine, wash temperatures.',
        leadName: 'Elena Rostova',
        members: [
          { userId: 'usr-1', name: 'Elena Rostova', role: 'Operations Director', email: 'elena.rostova@opspilot.internal', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', activeTasksCount: 1 }
        ]
      },
      {
        id: 'team-plumbing-util',
        name: 'Plumbing & Facilities',
        workspaceId: 'ranchers',
        description: 'Grease traps, exhaust hoods, drain clearance, water heaters, gas line safety.',
        leadName: 'David Kim',
        members: [
          { userId: 'usr-5', name: 'David Kim', role: 'Equipment Specialist', email: 'david.kim@ranchers.internal', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', activeTasksCount: 2 }
        ]
      }
    ]
  },
  {
    id: 'colabs',
    name: 'COLABS Coworking & Tech Campus',
    tagline: 'Modern Workspace, Facilities & Community Operations',
    description: 'Shared workplace facilities, IoT presentation hubs, climate controls, power infrastructure, and member community requests.',
    domain: 'Commercial Real Estate & Space Operations',
    locations: [
      'Innovation Auditorium - Projector Hub',
      'Meeting Room 3B - Video Bar',
      'Level 2 Open Desks - East Wing',
      'Main Rooftop HVAC Chiller Unit',
      'Ground Floor Cafe Barista Station',
      'Server Room 1 - Rack B',
      'Access Control Turnstiles - Gate 2'
    ],
    categories: [
      'Facilities & Power',
      'HVAC & Climate Control',
      'Audio/Visual & Projectors',
      'IT Support & Networking',
      'Furniture & Fixtures',
      'Housekeeping & Janitorial',
      'Access Control & Security'
    ],
    teams: [
      {
        id: 'team-facilities-space',
        name: 'Space Engineering & Power',
        workspaceId: 'colabs',
        description: 'Floor raceways, sit-stand desks, circuit breakers, lighting, HVAC chillers, structural elements.',
        leadName: 'Marcus Vance',
        members: [
          { userId: 'usr-2', name: 'Marcus Vance', role: 'Senior Facilities Specialist', email: 'marcus.vance@opspilot.internal', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', activeTasksCount: 3 }
        ]
      },
      {
        id: 'team-av-infra',
        name: 'AV & Tech Infrastructure',
        workspaceId: 'colabs',
        description: '4K laser projectors, meeting room video soundbars, HDMI fiber extenders, Wi-Fi 6 access points.',
        leadName: 'Sarah Chen',
        members: [
          { userId: 'usr-4', name: 'Sarah Chen', role: 'QA & Space Lead', email: 'sarah.chen@colabs.internal', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', activeTasksCount: 2 }
        ]
      },
      {
        id: 'team-community-exp',
        name: 'Community & Space Experience',
        workspaceId: 'colabs',
        description: 'Meeting room bookings, noise control, barista station, guest reception, event logistics.',
        leadName: 'Sarah Chen',
        members: [
          { userId: 'usr-4', name: 'Sarah Chen', role: 'Space Lead', email: 'sarah.chen@colabs.internal', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', activeTasksCount: 2 },
          { userId: 'usr-6', name: 'Alex Rivera', role: 'Community Representative', email: 'alex.rivera@community.internal', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', activeTasksCount: 1 }
        ]
      },
      {
        id: 'team-janitorial-space',
        name: 'Space Janitorial & Sanitation',
        workspaceId: 'colabs',
        description: 'Spill response, waste recycling sorting, restroom maintenance, air purification filters.',
        leadName: 'Marcus Vance',
        members: [
          { userId: 'usr-2', name: 'Marcus Vance', role: 'Facilities Specialist', email: 'marcus.vance@opspilot.internal', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', activeTasksCount: 3 }
        ]
      }
    ]
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-101',
    ticketNumber: 'RAN-2026-081',
    title: 'Commercial Deep Fryer #2 Overheating & Thermocouple Sensor Glitch',
    description: 'Fryer temperature dial fluctuates wildly between 180°C and 225°C. Oil smoking prematurely. Pilot indicator light flickers under load.',
    workspaceId: 'ranchers',
    location: 'Hot Kitchen - Fryer Station 02',
    category: 'Kitchen Appliances',
    priority: 'critical',
    status: 'awaiting_verification',
    reportingMethod: 'photo',
    originalEvidenceUrl: '/src/assets/images/ranchers_kitchen_ops_1792307334149.jpg',
    assignedTeam: 'Kitchen Line & Appliances',
    assignee: DEMO_USERS[4], // David Kim
    reporter: DEMO_USERS[2], // Chef Tariq
    dueAt: '2026-10-18T18:00:00Z',
    aiAnalysis: {
      provider: 'ai',
      issueSummary: 'Fryer temperature thermostat malfunction causing oil overheat and fire hazard.',
      detectedType: 'Thermostat / Thermocouple Failure',
      suggestedCategory: 'Kitchen Appliances',
      recommendedPriority: 'critical',
      safetyWarnings: [
        'HIGH BURN & FIRE RISK: De-energize fryer immediately from circuit breaker.',
        'DO NOT use water on hot cooking oil.',
        'Quarantine fryer until replacement thermocouple is installed and tested.'
      ],
      suggestedSteps: [
        '1. Power down fryer and let cooking oil cool below 60°C.',
        '2. Inspect thermocouple resistance with multimeter (nominal 10-15 ohms).',
        '3. Replace high-limit safety cut-off sensor.',
        '4. Recalibrate digital PID controller to 175°C calibration standard.',
        '5. Take photo of restored unit and calibrated digital display.'
      ],
      recommendedTeam: 'Kitchen Line & Appliances',
      estimatedEffort: '1.5 hours',
      confidenceScore: 96,
      limitations: 'Electrical and gas connections must only be serviced by certified technicians.'
    },
    resolutionSubmission: {
      submittedBy: DEMO_USERS[4],
      submittedAt: '2026-10-18T04:15:00Z',
      completionNotes: 'Replaced high-limit thermal sensor (Part #TS-884) and recalibrated thermostat. Tested at steady 175°C for 45 minutes with oil circulating nominally. Safety shut-off functional.',
      partsUsed: 'High-limit thermocouple sensor TS-884, silicone heat paste',
      resolutionEvidenceUrl: '/src/assets/images/verification_inspection_1792307335334.jpg',
      aiComparison: {
        provider: 'ai',
        observableChanges: [
          'Thermocouple wiring bundle replaced and neatly secured in protective heat sleeve.',
          'Digital control panel displays calibrated 175°C target temperature without fault code.',
          'Workstation degreased and free of oil splatters or carbon residues.'
        ],
        unresolvedConcerns: [],
        safetyCheckPassed: true,
        inspectionScore: 94,
        aiRecommendation: 'recommend_approval',
        remarks: 'Resolution evidence shows clean installation, new thermocouple securely mounted, and steady thermal telemetry. Recommended for supervisor sign-off.'
      }
    },
    comments: [
      {
        id: 'c-1',
        author: DEMO_USERS[2],
        content: 'Shutdown unit immediately around 9:00 AM after oil began smoking. Switched off breaker 4.',
        createdAt: '2026-10-18T01:10:00Z'
      },
      {
        id: 'c-2',
        author: DEMO_USERS[4],
        content: 'Picked up replacement sensor from central inventory. Installing now.',
        createdAt: '2026-10-18T02:40:00Z'
      }
    ],
    activityLog: [
      {
        id: 'act-1',
        timestamp: '2026-10-18T01:05:00Z',
        actor: 'Chef Tariq Al-Mansoor',
        action: 'Issue Reported',
        details: 'Dispatched to Kitchen Line & Appliances with Critical priority.'
      },
      {
        id: 'act-2',
        timestamp: '2026-10-18T01:08:00Z',
        actor: 'OpsPilot AI Engine',
        action: 'AI Safety & Root Cause Analysis',
        details: 'Identified Thermocouple runaway risk; generated emergency cut-off instructions.'
      },
      {
        id: 'act-3',
        timestamp: '2026-10-18T01:30:00Z',
        actor: 'Elena Rostova',
        action: 'Assigned Task',
        details: 'Assigned to David Kim (Culinary Equipment Specialist).'
      },
      {
        id: 'act-4',
        timestamp: '2026-10-18T04:15:00Z',
        actor: 'David Kim',
        action: 'Submitted Resolution Evidence',
        details: 'Uploaded post-repair inspection evidence. Triggered AI Verification review.'
      }
    ],
    createdAt: '2026-10-18T01:05:00Z',
    updatedAt: '2026-10-18T04:15:00Z'
  },
  {
    id: 'task-102',
    ticketNumber: 'RAN-2026-082',
    title: 'Walk-In Chiller B Door Gasket Torn & Ambient Temperature Creep',
    description: 'Bottom silicone gasket on walk-in freezer door is torn by 12 inches. Temperature has climbed from 2°C to 7.4°C over 4 hours. Condensation pooling on threshold.',
    workspaceId: 'ranchers',
    location: 'Walk-in Chiller B',
    category: 'Cold Chain & Refrigeration',
    priority: 'high',
    status: 'in_progress',
    reportingMethod: 'voice',
    voiceTranscription: 'Hey ops, this is Tariq. The walk-in chiller B door seal has split along the bottom seam. Cold air is rushing out and the temp gauge hit seven point four degrees. We need this sealed before morning prep stock spoils.',
    assignedTeam: 'Cold Chain & Refrigeration',
    assignee: DEMO_USERS[4],
    reporter: DEMO_USERS[2],
    dueAt: '2026-10-18T14:00:00Z',
    aiAnalysis: {
      provider: 'ai',
      issueSummary: 'Torn door gasket causing thermal leak in walk-in cold storage.',
      detectedType: 'Refrigeration Seal Degradation',
      suggestedCategory: 'Cold Chain & Refrigeration',
      recommendedPriority: 'high',
      safetyWarnings: [
        'FOOD SPOILAGE ALERT: Dairy and poultry stored above 4.4°C (40°F) for >2 hours requires quarantine.',
        'Slip hazard from condensation runoff around threshold.'
      ],
      suggestedSteps: [
        '1. Transfer sensitive poultry and dairy cartons to Backup Chiller A immediately.',
        '2. Strip damaged magnetic vinyl compression gasket from channel.',
        '3. Clean channel with food-grade alcohol wipes.',
        '4. Snap in new 36x84 inch perimeter gasket.',
        '5. Perform dollar-bill pinch test across all corners to verify airtight seal.'
      ],
      recommendedTeam: 'Cold Chain & Refrigeration',
      estimatedEffort: '45 minutes',
      confidenceScore: 92,
      limitations: 'Verify internal food probe temperatures before releasing inventory.'
    },
    comments: [
      {
        id: 'c-3',
        author: DEMO_USERS[4],
        content: 'Temporary thermal curtain installed while I retrieve replacement gasket strip.',
        createdAt: '2026-10-18T03:15:00Z'
      }
    ],
    activityLog: [
      {
        id: 'act-5',
        timestamp: '2026-10-18T02:00:00Z',
        actor: 'Chef Tariq Al-Mansoor',
        action: 'Reported Issue via Voice Note',
        details: 'Transcribed via OpsPilot Voice AI.'
      },
      {
        id: 'act-6',
        timestamp: '2026-10-18T02:15:00Z',
        actor: 'Elena Rostova',
        action: 'Marked In Progress',
        details: 'Assigned to David Kim. Stock migration initiated.'
      }
    ],
    createdAt: '2026-10-18T02:00:00Z',
    updatedAt: '2026-10-18T03:15:00Z'
  },
  {
    id: 'task-103',
    ticketNumber: 'RAN-2026-083',
    title: 'Sanitizer Dispenser Line Air Lock at Dishwashing Station',
    description: 'High-temp commercial dishwasher sanitizer line not drawing quaternary chemical. Sanitizer titration strip reads 0 PPM.',
    workspaceId: 'ranchers',
    location: 'Dishwashing & Sanitization Area',
    category: 'Food Safety & Hygiene',
    priority: 'high',
    status: 'assigned',
    reportingMethod: 'text',
    assignedTeam: 'Food Safety & Compliance',
    assignee: DEMO_USERS[0], // Elena
    reporter: DEMO_USERS[2],
    dueAt: '2026-10-18T16:00:00Z',
    aiAnalysis: {
      provider: 'ai',
      issueSummary: 'Peristaltic chemical pump air-lock resulting in un-sanitized cookware.',
      detectedType: 'Hygiene Chemical Dosing Failure',
      suggestedCategory: 'Food Safety & Hygiene',
      recommendedPriority: 'high',
      safetyWarnings: [
        'CRITICAL HEALTH CODE VIOLATION: Cookware cannot be cleared for food service without minimum 200 PPM quaternary sanitizer.',
        'Wear chemical safety goggles when priming dosing tubes.'
      ],
      suggestedSteps: [
        '1. Halt clean-dish racking and hold cycle dishes for re-wash.',
        '2. Inspect intake foot valve in sanitizer chemical container.',
        '3. Engage manual prime toggle switch on pump module for 30 seconds.',
        '4. Run test cycle and verify color change on chlorine/quat titration test strip.'
      ],
      recommendedTeam: 'Food Safety & Compliance',
      estimatedEffort: '20 minutes',
      confidenceScore: 98,
      limitations: 'Ensure chemical container is not depleted.'
    },
    comments: [],
    activityLog: [
      {
        id: 'act-7',
        timestamp: '2026-10-18T03:00:00Z',
        actor: 'Chef Tariq Al-Mansoor',
        action: 'Reported Issue via Text Form',
        details: 'Notified QA lead.'
      }
    ],
    createdAt: '2026-10-18T03:00:00Z',
    updatedAt: '2026-10-18T03:00:00Z'
  },
  {
    id: 'task-201',
    ticketNumber: 'COL-2026-114',
    title: 'Auditorium 4K Laser Projector HDMI Matrix Dropout & Artifacting',
    description: 'Main auditorium ceiling projector exhibits green pixel static and intermittent signal blackouts every 45 seconds during presentations. Keynote rehearsal impacted.',
    workspaceId: 'colabs',
    location: 'Innovation Auditorium - Projector Hub',
    category: 'Audio/Visual & Projectors',
    priority: 'critical',
    status: 'awaiting_verification',
    reportingMethod: 'photo',
    originalEvidenceUrl: '/src/assets/images/colabs_workspace_tech_1792307334095.jpg',
    assignedTeam: 'AV & Tech Infrastructure',
    assignee: DEMO_USERS[3], // Sarah Chen
    reporter: DEMO_USERS[1], // Marcus Vance
    dueAt: '2026-10-18T12:00:00Z',
    aiAnalysis: {
      provider: 'ai',
      issueSummary: 'Fiber optical HDMI extender transmitter experiencing packet loss and handshake degradation.',
      detectedType: 'AV Signal Transport Failure',
      suggestedCategory: 'Audio/Visual & Projectors',
      recommendedPriority: 'critical',
      safetyWarnings: [
        'Do not look directly into active fiber optic laser transmitter ports.',
        'Ceiling access requires secondary spotter for step ladder safety.'
      ],
      suggestedSteps: [
        '1. Inspect active optical cable transmitter (Tx) LED status in stage wall-plate.',
        '2. Power-cycle 4K HDBaseT receiver unit on ceiling cradle.',
        '3. Swap damaged 15m optical HDMI line with shielded Cat6A balun backup.',
        '4. Lock EDID resolution handshake to 3840x2160 @ 60Hz 4:4:4.',
        '5. Test continuous color bar video loop for 20 minutes without frame drop.'
      ],
      recommendedTeam: 'AV & Tech Infrastructure',
      estimatedEffort: '40 minutes',
      confidenceScore: 95,
      limitations: 'Confirm laptop source graphics driver is not outputting non-standard refresh rate.'
    },
    resolutionSubmission: {
      submittedBy: DEMO_USERS[3],
      submittedAt: '2026-10-18T05:30:00Z',
      completionNotes: 'Replaced faulty optical fiber transceiver unit. Locked EDID to 4K60p 8-bit. Verified crisp 4K signal transmission for 30 minutes with zero drops or flickering.',
      partsUsed: 'Extron DTP T HWP 4K transmitter module, certified ultra-high-speed patch cable',
      resolutionEvidenceUrl: '/src/assets/images/verification_inspection_1792307335334.jpg',
      aiComparison: {
        provider: 'ai',
        observableChanges: [
          'Signal analyzer confirms stable 18 Gbps bandwidth throughput without packet drop.',
          'Display output is crystal clear with no chromatic fringing or green artifacts.',
          'Wall-plate neatly reassembled and flush mounted.'
        ],
        unresolvedConcerns: [],
        safetyCheckPassed: true,
        inspectionScore: 98,
        aiRecommendation: 'recommend_approval',
        remarks: 'Repair satisfies all technical criteria. Ready for event coordinator sign-off.'
      }
    },
    comments: [
      {
        id: 'c-4',
        author: DEMO_USERS[1],
        content: 'Auditorium keynote starts in 3 hours. Top priority.',
        createdAt: '2026-10-18T04:00:00Z'
      }
    ],
    activityLog: [
      {
        id: 'act-8',
        timestamp: '2026-10-18T03:50:00Z',
        actor: 'Marcus Vance',
        action: 'Reported Issue',
        details: 'Tagged Critical priority for upcoming tech talk.'
      },
      {
        id: 'act-9',
        timestamp: '2026-10-18T05:30:00Z',
        actor: 'Sarah Chen',
        action: 'Submitted Resolution Evidence',
        details: 'Fiber transceiver swapped; AI Comparison scored 98%.'
      }
    ],
    createdAt: '2026-10-18T03:50:00Z',
    updatedAt: '2026-10-18T05:30:00Z'
  },
  {
    id: 'task-202',
    ticketNumber: 'COL-2026-115',
    title: 'Rooftop HVAC Chiller Unit B Vibration Damper Fatigue & Noise',
    description: 'Compressor mounting pad on chiller B has ruptured. Heavy resonant vibration traveling down structural columns into 4th floor private offices.',
    workspaceId: 'colabs',
    location: 'Main Rooftop HVAC Chiller Unit',
    category: 'HVAC & Climate Control',
    priority: 'medium',
    status: 'in_progress',
    reportingMethod: 'text',
    assignedTeam: 'Space Engineering & Power',
    assignee: DEMO_USERS[1],
    reporter: DEMO_USERS[3],
    dueAt: '2026-10-19T10:00:00Z',
    aiAnalysis: {
      provider: 'ai',
      issueSummary: 'Elastomeric spring isolator degradation on commercial roof chiller.',
      detectedType: 'Structural Acoustic & Vibration Dampening Failure',
      suggestedCategory: 'HVAC & Climate Control',
      recommendedPriority: 'medium',
      safetyWarnings: [
        'Rooftop wind gusts require safety tether harness.',
        'Lockout/tagout chiller main 480V disconnect before placing hydraulic jack under frame.'
      ],
      suggestedSteps: [
        '1. LOTO chiller circuit breaker 3B on rooftop sub-panel.',
        '2. Position 5-ton hydraulic toe jack under compressor corner bracket.',
        '3. Elevate frame 20mm and slide out crushed neoprene isolator pad.',
        '4. Install rated Mason Industries heavy-duty spring vibration isolator.',
        '5. Measure acoustic decibel level in 4th floor conference room below.'
      ],
      recommendedTeam: 'Space Engineering & Power',
      estimatedEffort: '2.5 hours',
      confidenceScore: 91,
      limitations: 'Ensure hydraulic jack load rating exceeds 3,000 lbs.'
    },
    comments: [
      {
        id: 'c-5',
        author: DEMO_USERS[1],
        content: 'Lockout tag applied. Waiting on facilities truck with heavy duty isolator springs.',
        createdAt: '2026-10-18T06:00:00Z'
      }
    ],
    activityLog: [
      {
        id: 'act-10',
        timestamp: '2026-10-18T05:00:00Z',
        actor: 'Sarah Chen',
        action: 'Reported Issue',
        details: 'Member noise complaints received.'
      }
    ],
    createdAt: '2026-10-18T05:00:00Z',
    updatedAt: '2026-10-18T06:00:00Z'
  },
  {
    id: 'task-203',
    ticketNumber: 'COL-2026-116',
    title: 'Floor Power Rail Breaker Tripped in East Wing Desks',
    description: 'Entire row of 12 sit-stand workstations lost power suddenly. Members unable to charge laptops or use external monitors.',
    workspaceId: 'colabs',
    location: 'Level 2 Open Desks - East Wing',
    category: 'Facilities & Power',
    priority: 'high',
    status: 'resolved',
    reportingMethod: 'text',
    assignedTeam: 'Space Engineering & Power',
    assignee: DEMO_USERS[1],
    reporter: DEMO_USERS[3],
    dueAt: '2026-10-18T08:00:00Z',
    aiAnalysis: {
      provider: 'ai',
      issueSummary: 'Branch circuit breaker overload or ground fault on floor raceway.',
      detectedType: 'Electrical Branch Circuit Tripped',
      suggestedCategory: 'Facilities & Power',
      recommendedPriority: 'high',
      safetyWarnings: [
        'Check for frayed personal appliance cables before resetting breaker.',
        'Do not repeatedly reset a tripping breaker.'
      ],
      suggestedSteps: [
        '1. Inspect desks for unauthorized high-draw appliances (space heaters, kettles).',
        '2. Test insulation resistance on raceway busbar.',
        '3. Reset 20A GFCI circuit breaker 2-E-14 in electrical closet B.',
        '4. Verify voltage at all 12 power modules.'
      ],
      recommendedTeam: 'Space Engineering & Power',
      estimatedEffort: '25 minutes',
      confidenceScore: 97,
      limitations: 'Confirm no water intrusion from indoor plant pots.'
    },
    resolutionSubmission: {
      submittedBy: DEMO_USERS[1],
      submittedAt: '2026-10-18T07:15:00Z',
      completionNotes: 'Identified unauthorized 1500W ceramic space heater plugged in at Desk 14B which overloaded circuit. Removed heater, verified 120V nominal across all outlets, and reset breaker.',
      partsUsed: 'None (overload remediation)',
      resolutionEvidenceUrl: '/src/assets/images/verification_inspection_1792307335334.jpg',
      aiComparison: {
        provider: 'ai',
        observableChanges: [
          'All desk surge indicators glowing green.',
          'High wattage appliance removed from work surface.',
          'Panel breaker engaged without arcing.'
        ],
        unresolvedConcerns: [],
        safetyCheckPassed: true,
        inspectionScore: 99,
        aiRecommendation: 'recommend_approval',
        remarks: 'Confirmed electrical circuit safe and operational.'
      }
    },
    verificationReview: {
      reviewedBy: DEMO_USERS[3],
      reviewedAt: '2026-10-18T07:30:00Z',
      decision: 'approved',
      feedback: 'Reviewed on site. Power restored to all 12 workstations and community manager reminded member of space heater policy. Excellent turnaround.'
    },
    comments: [],
    activityLog: [
      {
        id: 'act-11',
        timestamp: '2026-10-18T06:30:00Z',
        actor: 'Sarah Chen',
        action: 'Reported Issue',
        details: 'High priority outage.'
      },
      {
        id: 'act-12',
        timestamp: '2026-10-18T07:15:00Z',
        actor: 'Marcus Vance',
        action: 'Submitted Resolution',
        details: 'Space heater removed; power restored.'
      },
      {
        id: 'act-13',
        timestamp: '2026-10-18T07:30:00Z',
        actor: 'Sarah Chen',
        action: 'Approved Verification',
        details: 'Officially verified and marked Resolved.'
      }
    ],
    createdAt: '2026-10-18T06:30:00Z',
    updatedAt: '2026-10-18T07:30:00Z'
  }
];

export const SAMPLE_REPORT_PRESETS = [
  {
    title: 'Commercial Fryer Oil Smoking & Temperature Fluctuation',
    workspaceId: 'ranchers' as const,
    location: 'Hot Kitchen - Fryer Station 02',
    category: 'Kitchen Appliances',
    description: 'Digital display is flashing E-04 error code. Oil smoking heavily and temperature sensor is unresponsive to dial adjustment. Staff alerted to stop using unit.',
    imageUrl: '/src/assets/images/ranchers_kitchen_ops_1792307334149.jpg'
  },
  {
    title: 'Ceiling Water Leak Pooling Above Auditorium AV Rack',
    workspaceId: 'colabs' as const,
    location: 'Innovation Auditorium - Projector Hub',
    category: 'Facilities & Power',
    description: 'Water dripping from ceiling acoustic tile directly onto the secondary AV distribution rack. Tarp currently placed over rack but ceiling drywall is bulging.',
    imageUrl: '/src/assets/images/colabs_workspace_tech_1792307334095.jpg'
  },
  {
    title: 'Walk-In Chiller Temperature Spike & Condensation',
    workspaceId: 'ranchers' as const,
    location: 'Walk-in Chiller B',
    category: 'Cold Chain & Refrigeration',
    description: 'Evaporator fan coils are iced over completely. Chiller temperature reading 8.2°C instead of 2.0°C. Compressor motor is running hot and humming loudly.',
    imageUrl: '/src/assets/images/ranchers_kitchen_ops_1792307334149.jpg'
  },
  {
    title: 'Exposed Frayed Power Cabling on Standing Desk',
    workspaceId: 'colabs' as const,
    location: 'Level 2 Open Desks - East Wing',
    category: 'Facilities & Power',
    description: 'Height adjustable desk mechanism crushed the main 110V supply cord. Copper conductors exposed with scorch marks on table leg. Breaker has not tripped yet.',
    imageUrl: '/src/assets/images/colabs_workspace_tech_1792307334095.jpg'
  }
];

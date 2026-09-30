export type AgentName="lead-intelligence"|"research"|"content"|"campaign"|"client-success"|"reporting"|"operations";
export type AgentRun={agent:AgentName;goal:string;input?:Record<string,unknown>};
export const agentRegistry:Record<AgentName,{description:string;approvalRequired:boolean}>={
 "lead-intelligence":{description:"Enrich, score and route leads.",approvalRequired:false},
 "research":{description:"Research markets, competitors and audience signals.",approvalRequired:false},
 "content":{description:"Plan and draft content and creative briefs.",approvalRequired:false},
 "campaign":{description:"Analyse campaigns and prepare optimisation actions.",approvalRequired:true},
 "client-success":{description:"Prepare client updates, follow-ups and account actions.",approvalRequired:true},
 "reporting":{description:"Turn business and campaign data into reports.",approvalRequired:false},
 "operations":{description:"Coordinate tasks, reminders and internal workflows.",approvalRequired:false}
};
export function canAutoExecute(agent:AgentName){return !agentRegistry[agent].approvalRequired}
type Group =
  | "General"
  | "Networking"
  | "Compute and Web"
  | "Databases"
  | "Storage"
  | "AI and machine learning"
  | "Analytics and IoT"
  | "Integration"

const Groups = [
  "General",
  "Networking",
  "Compute and Web",
  "Databases",
  "Storage",
  "AI and machine learning",
  "Analytics and IoT",
  "Integration",
]

type Scope =
  | "Business Unit"
  | "Environment Type"
  | "Account"
  | "Enterprise Agreement"
  | "Subscription"
  | "Global"
  | "Resource Group"
  | "Virtual Network"
  | "Subnet"
  | "NIC"
  | "Virtual Gateway"
  | "Notification Hubs Namespace"
  | "Azure SQL Database"
  | "Service Bus"

type Asset = {
  type: string
  group: Group
  scope: Set<Scope>
  format: {
    joinWith: string
    suffix?: string
    maximunLength: number
    inputs: FormatInput[]
  }
}

type FormatInput = {
  description: string
  mandatory: boolean
  fixedName?: string
  placeholders: string[]
}

function input(
  description: string,
  mandatory: boolean,
  fixedName: string | undefined,
  placeholders: string[],
): FormatInput {
  return { description, mandatory, fixedName, placeholders }
}

const Inputs = {
  "business unit": input("business unit", true, undefined, [
    "mktg",
    "hr",
    "corp",
    "fin",
  ]),
  "subscription type": input("subscription type", true, undefined, [
    "prod",
    "shared",
    "client",
  ]),
  "3 digit number": input("3 digit number", true, undefined, ["001"]),
  "2 digit number": input("2 digit number", true, undefined, ["01"]),
  "app or service name": input("app or service name", true, undefined, [
    "mktgsharepoint",
    "acctlookupsvc",
    "ad-dir-services",
    "navigator-prod",
    "appcn-keda-prod-eastus2-001",
  ]),
  region: input("region", true, undefined, ["eastus2", "westus"]),
  environment: input("environment", true, undefined, ["shared", "prod"]),
  "app name": input("app name", true, undefined, [
    "navigator",
    "accountlookup",
    "emissions",
  ]),
  "query descriptor": input("query descriptor", true, undefined, [
    "messagequery",
  ]),
}

const Assets: Asset[] = [
  {
    type: "Management Group",
    group: "General",
    scope: new Set<Scope>(["Business Unit", "Environment Type"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("management group", true, "mg", ["mg"]),
        Inputs["business unit"],
        input("enviroment type", false, undefined, ["prod", "client"]),
      ],
    },
  },
  {
    type: "Subscription",
    group: "General",
    scope: new Set<Scope>(["Account", "Enterprise Agreement"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        Inputs["business unit"],
        Inputs["subscription type"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Resource Group",
    group: "General",
    scope: new Set<Scope>(["Subscription"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("resource group", true, "rg", ["rg"]),
        Inputs["app or service name"],
        Inputs["subscription type"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "API management service instance",
    group: "General",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("api management service instance", true, "apim", ["apim"]),
        Inputs["app or service name"],
      ],
    },
  },
  {
    type: "Managed identity",
    group: "General",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("managed identity", true, "id", ["id"]),
        Inputs["app or service name"],
      ],
    },
  },
  {
    type: "Virtual network",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("virtual network", true, "vnet", ["vnet"]),
        Inputs["subscription type"],
        Inputs["region"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Subnet",
    group: "Networking",
    scope: new Set<Scope>(["Virtual Network"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("subnet", true, "snet", ["snet"]),
        Inputs["subscription type"],
        Inputs.region,
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Network interface (NIC)",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("network interface", true, "nic", ["nic"]),
        Inputs["2 digit number"],
        input("vm name", true, undefined, ["dc1", "vmhadoop1", "vmtest1"]),
        Inputs["subscription type"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Public IP address",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("public ip address", true, "pip", ["pip"]),
        input("vm name or app name", true, undefined, [
          "dc1",
          "vmhadoop1",
          "vmtest1",
        ]),
        Inputs.environment,
        Inputs.region,
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Load balancer",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("load balancer", true, "lb", ["lb"]),
        input("app name or role", true, undefined, ["navigator", "sharepoint"]),
        Inputs.environment,
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Network security group (NSG)",
    group: "Networking",
    scope: new Set<Scope>(["Subnet", "NIC"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("network security group", true, "nsg", ["nsg"]),
        input("policy name of app name", true, undefined, [
          "weballow",
          "rdpallow",
          "sqlallow",
          "dnsblocked",
        ]),
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Local network gateway",
    group: "Networking",
    scope: new Set<Scope>(["Virtual Gateway"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("local network gateway", true, "lgw", ["lgw"]),
        Inputs["subscription type"],
        Inputs.region,
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Virtual network gateway",
    group: "Networking",
    scope: new Set<Scope>(["Virtual Network"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("virtual network gateway", true, "vgw", ["vgw"]),
        Inputs["subscription type"],
        Inputs.region,
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Site-to-Site connection",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("site-to-site connection", true, "cn", ["cn"]),
        input("local gateway name", true, undefined, [
          "lgw-shared-eastus2-001",
        ]),
        input("to", true, "to", ["to"]),
        input("virtual gateway name", true, undefined, [
          "vgw-shared-eastus2-001",
          "vgw-shared-westus-001",
        ]),
      ],
    },
  },
  {
    type: "VPN connection",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("vpn connection", true, "cn", ["cn"]),
        { ...Inputs["subscription type"], description: "subscription 1" },
        { ...Inputs.region, description: "region 1" },
        input("to", true, "to", ["to"]),
        { ...Inputs["subscription type"], description: "subscription 2" },
        { ...Inputs.region, description: "region 2" },
      ],
    },
  },
  {
    type: "Route table",
    group: "Networking",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("route table", true, "route", ["route"]),
        input("route table name", true, undefined, ["navigator", "sharepoint"]),
      ],
    },
  },
  {
    type: "DNS label",
    group: "Networking",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: ".",
      suffix: ".cloudapp.azure.com",
      maximunLength: 100,
      inputs: [
        input("DNS A record for VM", true, undefined, ["dc1", "web1"]),
        Inputs.region,
      ],
    },
  },
  {
    type: "Virtual machine",
    group: "Compute and Web",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("vm", true, "vm", ["vm"]),
        input("policy name or app name", true, undefined, [
          "navigator",
          "sharepoint",
          "sqlnode",
          "hadoop",
        ]),
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "VM storage account",
    group: "Compute and Web",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("stvm", true, "stvm", ["stvm"]),
        input("performance type", true, undefined, ["st", "pm"]),
        input("app name or prod name", true, undefined, [
          "core",
          "plm",
          "hadoop",
        ]),
        Inputs.region,
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Web app",
    group: "Compute and Web",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      suffix: ".azurewebsites.net",
      maximunLength: 100,
      inputs: [
        input("app", true, "app", ["app"]),
        Inputs["app name"],
        Inputs["environment"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Function app",
    group: "Compute and Web",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      suffix: ".azurewebsites.net",
      maximunLength: 100,
      inputs: [
        input("func", true, "func", ["func"]),
        Inputs["app name"],
        Inputs["environment"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Cloud service",
    group: "Compute and Web",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      suffix: ".cloudapp.net",
      maximunLength: 100,
      inputs: [
        input("cld", true, "cld", ["cld"]),
        Inputs["app name"],
        Inputs["environment"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Notification Hubs namespace",
    group: "Compute and Web",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("ntfns", true, "ntfns", ["ntfns"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Notification hub",
    group: "Compute and Web",
    scope: new Set<Scope>(["Notification Hubs Namespace"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("ntf", true, "ntf", ["ntf"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure SQL Database server",
    group: "Databases",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("sql", true, "sql", ["sql"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure SQL database",
    group: "Databases",
    scope: new Set<Scope>(["Azure SQL Database"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("sqldb", true, "sqldb", ["sqldb"]),
        input("database name", true, undefined, ["users"]),
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Cosmos DB database",
    group: "Databases",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("cosmos", true, "cosmos", ["cosmos"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Cache for Redis instance",
    group: "Databases",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("redis", true, "redis", ["redis"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "MySQL database",
    group: "Databases",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("mysql", true, "mysql", ["mysql"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "PostgreSQL database",
    group: "Databases",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("psql", true, "psql", ["psql"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Synapse Analytics",
    group: "Databases",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("syn", true, "syn", ["syn"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "SQL Server Stretch Database",
    group: "Databases",
    scope: new Set<Scope>(["Azure SQL Database"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("sqlstrdb", true, "sqlstrdb", ["sqlstrdb"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Storage account (general use)",
    group: "Storage",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("st", true, "st", ["st"]),
        input("storage name", true, undefined, [
          "navigatordata",
          "emissionoutput",
        ]),
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Storage account (diagnostic logs)",
    group: "Storage",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("stdiag", true, "stdiag", ["stdiag"]),
        input(
          "first 2 letters of subscription name and number",
          true,
          undefined,
          ["sh001"],
        ),
        Inputs["region"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Azure StorSimple",
    group: "Storage",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("ssimp", true, "ssimp", ["ssimp"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Container Registry",
    group: "Storage",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("acr", true, "acr", ["acr"]),
        Inputs["app name"],
        Inputs["environment"],
        Inputs["3 digit number"],
      ],
    },
  },
  {
    type: "Azure Cognitive Search",
    group: "AI and machine learning",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("srch", true, "srch", ["srch"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Cognitive Services",
    group: "AI and machine learning",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("cog", true, "cog", ["cog"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Machine Learning workspace",
    group: "AI and machine learning",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("mlw", true, "mlw", ["mlw"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Data Factory",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("adf", true, "adf", ["adf"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Azure Stream Analytics",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Resource Group"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("asa", true, "asa", ["asa"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Data Lake Analytics account",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("dla", true, "dla", ["dla"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Data Lake Storage account",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "",
      maximunLength: 100,
      inputs: [
        input("dls", true, "dls", ["dls"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Event hub",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("evh", true, "evh", ["evh"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "HDInsight - HBase cluster",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("hbase", true, "hbase", ["hbase"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "HDInsight - Hadoop cluster",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("hadoop", true, "hadoop", ["hadoop"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "HDInsight - Spark cluster",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("spark", true, "spark", ["spark"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "IoT hub",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("iot", true, "iot", ["iot"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Power BI Embedded",
    group: "Analytics and IoT",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [
        input("pbi", true, "pbi", ["pbi"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Service Bus",
    group: "Integration",
    scope: new Set<Scope>(["Global"]),
    format: {
      joinWith: "-",
      suffix: ".servicebus.windows.net",
      maximunLength: 100,
      inputs: [
        input("sb", true, "sb", ["sb"]),
        Inputs["app name"],
        Inputs["environment"],
      ],
    },
  },
  {
    type: "Service Bus queue",
    group: "Integration",
    scope: new Set<Scope>(["Service Bus"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [input("sbq", true, "sbq", ["sbq"]), Inputs["query descriptor"]],
    },
  },
  {
    type: "Service Bus topic",
    group: "Integration",
    scope: new Set<Scope>(["Service Bus"]),
    format: {
      joinWith: "-",
      maximunLength: 100,
      inputs: [input("sbt", true, "sbt", ["sbt"]), Inputs["query descriptor"]],
    },
  },
]

export { Groups, Asset, Assets }

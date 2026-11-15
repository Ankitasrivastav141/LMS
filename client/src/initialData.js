// Initial seeded persistent data from user's uploaded courses
// Pre-populated so subjects, PPTs, AI notes, and MCQs are always visible on ANY device.

export const INITIAL_DATA = {
  "subjects": [
    {
      "id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "name": "Economics",
      "description": "",
      "color": "#E52521",
      "icon": "BookOpen",
      "created_at": "2026-11-05T22:22:49.707406",
      "updated_at": "2026-11-05T22:22:49.707406"
    },
    {
      "id": "09fe9fd0-c3a8-49e7-8942-74aaa1606628",
      "name": "Emerging Tech",
      "description": "",
      "color": "#E52521",
      "icon": "BookOpen",
      "created_at": "2026-11-06T09:33:01.269Z",
      "updated_at": "2026-11-06T09:33:01.269Z"
    },
    {
      "id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "name": "Market Research Method",
      "description": "",
      "color": "#191A23",
      "icon": "BookOpen",
      "created_at": "2026-11-06T09:32:19.484Z",
      "updated_at": "2026-11-06T09:32:19.484Z"
    },
    {
      "id": "2f236e4d-9b91-4f6b-97d8-110d05a5b4bb",
      "name": "Product Management",
      "description": "",
      "color": "#2563EB",
      "icon": "BookOpen",
      "created_at": "2026-11-06T09:31:55.924Z",
      "updated_at": "2026-11-06T09:31:55.924Z"
    },
    {
      "id": "83ba844c-f18b-463f-ac63-4de50e3edbef",
      "name": "Micro Economics",
      "description": "",
      "color": "#059669",
      "icon": "BookOpen",
      "created_at": "2026-11-06T09:31:31.456Z",
      "updated_at": "2026-11-06T09:31:31.456Z"
    }
  ],
  "materials": [
    {
      "id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "filename": "session 1- Introduction.pptx",
      "file_path": "C:\\Users\\Ankita\\Desktop\\LMS\\backend\\uploads\\2093cfe1-7c0e-4a7d-9885-a357550d2084\\9a09a350-ab6a-4178-b75f-e683198050a9_session 1- Introduction.pptx",
      "file_size": 1577410,
      "file_type": "pptx",
      "upload_date": "2026-11-05T22:23:12.111258",
      "processing_status": "processed",
      "error_message": null,
      "slide_count": 36,
      "summary": "PowerPoint presentation with 36 slides."
    },
    {
      "id": "612957e8-ea45-4431-91ca-d0844c131692",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "filename": "Usage and Attitude Study.pdf",
      "file_size": 328591,
      "file_type": "pdf",
      "upload_date": "2026-11-06T09:34:13.423Z",
      "processing_status": "processed",
      "slide_count": 3,
      "summary": "PDF document processed successfully."
    },
    {
      "id": "52ed5a65-6b8f-49d0-be2e-ee9c443b4d7e",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "filename": "S2 Problem Identification.pdf",
      "file_size": 664267,
      "file_type": "pdf",
      "upload_date": "2026-11-06T09:34:07.427Z",
      "processing_status": "processed",
      "slide_count": 3,
      "summary": "PDF document processed successfully."
    },
    {
      "id": "9a2fe269-2502-4a8b-a9b4-6fc3dd2b2a7c",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "filename": "S1 Introduction to the course.pdf",
      "file_size": 506851,
      "file_type": "pdf",
      "upload_date": "2026-11-06T09:34:02.084Z",
      "processing_status": "processed",
      "slide_count": 3,
      "summary": "PDF document processed successfully."
    },
    {
      "id": "3d045fd1-213d-4d8b-973e-ef138575431b",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "filename": "Research_Design_Blueprint.pdf",
      "file_size": 623964,
      "file_type": "pdf",
      "upload_date": "2026-11-06T09:33:54.585Z",
      "processing_status": "processed",
      "slide_count": 3,
      "summary": "PDF document processed successfully."
    },
    {
      "id": "10c77e1a-d937-46b1-92d0-8f00530d6e71",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "filename": "Qualitative_Research_Design.pdf",
      "file_size": 599763,
      "file_type": "pdf",
      "upload_date": "2026-11-06T09:33:46.695Z",
      "processing_status": "processed",
      "slide_count": 3,
      "summary": "PDF document processed successfully."
    },
    {
      "id": "aa68a52c-deb6-437e-aa73-849170f15dd1",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "filename": "marketing-research-an-applied-orientation_compress.pdf",
      "file_size": 7937528,
      "file_type": "pdf",
      "upload_date": "2026-11-06T09:33:36.640Z",
      "processing_status": "processed",
      "slide_count": 3,
      "summary": "PDF document processed successfully."
    }
  ],
  "extracted": [
    {
      "id": "416730df-8f62-4b8d-ab63-f99da30210d9",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 1,
      "title": "Managerial Economics",
      "content": "Gopal Naik,\nProfessor, Economics and Social Sciences",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "afdee1fa-e5c2-4d2f-8318-c03c587744b1",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 2,
      "title": "What are the key decisions made by the product managers?",
      "content": "Design of the product?\n  - What features? Profitability?\n  - What size?\n  - What packaging?\nProduction?\n  - How much?\nWhere to sell?\n  - What market?\n  - What segment?\n  - What promotion?\n  - What Price?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "7c357628-bf41-4924-909b-73b44ae7aed2",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 3,
      "title": "What Inputs are Needed to Make these Decisions?",
      "content": "Product Development\n  - What consumers want?\n  - Segment size?\n  - Profitability?\nProduction facility\n  - Technology of production?\n  - Capacity?\n  - Resources?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "2c642867-ccc4-4fe7-884f-1fd402654536",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 4,
      "title": "Market",
      "content": "Market\n  - Structure\n  - Conduct\n  - Competition\n  - Regulation\n  - Policy",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "7f3d45a5-ff08-4710-ba65-266c88ba88d8",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 5,
      "title": "Markets",
      "content": "- Demand – major factors affecting demand\n    - What type of change in the demand?\n    - How are consumer preferences and behaviour changing?\n  - Supply – major factors affecting supply\n  - Market structure – number of players, how they compete\nDomestic and International Markets",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "64beae70-a585-4f9f-8e0d-247b2c5e3f74",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 6,
      "title": "Analysis of related markets",
      "content": "Input market\n    - Supply\n    - Demand\nBy-product market\nSubstitute Products markets",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "6fe27ea4-a118-4b78-9b02-bd4974bfc076",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 7,
      "title": "Government Policies",
      "content": "Import – export policies\nTaxes, subsidies\nExperiences of other countries",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "2031a933-8ba8-4bd5-aeb2-aa9340e9f4d9",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 8,
      "title": "Risks and Uncertainty",
      "content": "Changing prices\n  - Changing supply\n  - Changing demand",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "911cc40f-75e9-4916-b7cb-baefce7ddbd0",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 9,
      "title": "9",
      "content": "9\nCircular-Flow Model of the Economy\nHouseholds\n- supply resources\n- demand goods and services\nFirms\n- supply goods and services\n- demand resources\nMoney flows in resource markets determine wages, interest, rents and profits.\nMoney flows as income to households\nProduct markets determine the prices for goods and services.\nThis flows as revenue to firms (source: Dale Bails)",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "9a26a936-c1bd-4d3b-be36-489d4cbe0529",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 10,
      "title": "Slide 10",
      "content": "",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "c6a17cd1-2ebb-4a5c-85ce-1002206dc7ac",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 11,
      "title": "Fundamentals of Economic Activity",
      "content": "Managerial economics deals with limits\n  - Limited budgets\n  - Limited time\n  - Limited ability to produce\nHow do we make the most of limits?\nHow do we allocate scarce resources?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "c37a8e62-6546-4f22-a349-abe1eaaedb79",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 12,
      "title": "Themes of Managerial Economics",
      "content": "Consumers\n  - Limited incomes\n  - Consumer theory – describes how consumers maximize their well-being, using their preferences, to make decisions about trade-offs\n  - How do consumers make decisions about consumption and savings?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "6a94c06e-1390-417c-a54a-d3b5b528f4ae",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 13,
      "title": "Themes of Microeconomics",
      "content": "Firms\n  - What types of products do firms produce?\n    - Constraints on production capacity and financial resources create trade-offs\n  - Theory of the Firm – describes how these trade-offs are best made",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "1fa0bda8-0545-43c9-a2e2-c432680a8dad",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 14,
      "title": "Themes of Microeconomics",
      "content": "Prices\n  - Trade-offs are often based on\n    - prices faced by consumers and producers\n  - Workers make decisions based on\n    - prices for labor – wages\n  - Firms make decisions based on\n    - wages\n    - prices for inputs and\n    - prices for the goods they produce",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "221017e8-7c1b-40d9-813a-83d22d7d4242",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 15,
      "title": "Themes of Microeconomics",
      "content": "Prices\n  - How are prices determined?\n    - Centrally planned economies – governments control prices\n    - Market economies – prices determined by interaction of market participants\n  - Markets – collection of buyers and sellers whose interaction determines the prices of goods",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "2bbd2aaa-20cf-404b-9ea4-593405aad763",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 16,
      "title": "What is a Market?",
      "content": "Market Definition\n  - Determination of the buyers, sellers, and range of products that should be included in a particular market",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "9c98280d-9952-4739-9e5f-7889f273ec97",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 17,
      "title": "What is a Market?",
      "content": "Functioning of the Market\n  - Most interesting questions in economics is concerned with the functioning of markets\n    - Why are there a lot of firms in some markets and not in others?\n    - Are consumers better off with many firms?\n    - Should the government intervene in markets?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "23fdf7dd-87a3-458c-acdf-e525fadf13f0",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 18,
      "title": "Types of Markets",
      "content": "Perfectly competitive markets\n  - Because of the large number of buyers and sellers, no individual buyer or seller can influence the price\n    - Example: Most agricultural markets\n  - Fierce competition among firms can create a competitive market",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "d1ff60bf-49a1-43e7-955d-de77f5bda5e9",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 19,
      "title": "Types of Markets",
      "content": "Noncompetitive Markets\n  - Markets where individual producers can influence the price\n    - Electricity market\n    - Cartels – groups of producers who act collectively\n    - Example: OPEC dominates with world oil market",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "cf3169d5-0f3c-49ca-9e73-d7976089deea",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 20,
      "title": "Market Price",
      "content": "Transactions between buyers and sellers are exchanges of goods for a certain price\n  - Market price – price prevailing in a competitive market\n    - Some markets have one price: price of gold\n    - Some markets have more than one price:\n      - Detergents - price of nirma versus wheel",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "9738ceb3-6418-42f2-8101-223906e81ca2",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 21,
      "title": "Theories and Models",
      "content": "Economics is concerned with explanation of observed phenomena\n  - Theories are used to explain observed phenomena in terms of a set of basic rules and assumptions:\n    - The Theory of the Firm\n    - The Theory of Consumer Behavior",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "9646c26c-bde6-4940-9f18-4d6907a59104",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 22,
      "title": "Theories and Models",
      "content": "Theories are used to make predictions\n  - Economic models are created from theories\n  - Models are mathematical representations used to make quantitative predictions",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "fcfdc1cc-056b-4048-864a-26dc610cdd4b",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 23,
      "title": "Positive & Normative Analysis",
      "content": "Positive Analysis – statements that describe the relationship of cause and effect\n  - Questions that deal with explanation and prediction\n    - What is the impact of AI on the growth of service sectors?\n    - What is the impact of an increase in the fuel excise tax?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "3a086e6b-0484-46b9-a046-fd9b4dcce1ca",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 24,
      "title": "Positive & Normative Analysis",
      "content": "Normative Analysis – analysis examining questions of what ought to be\n  - Often supplemented by value judgments\n    - Should the government go for prohibition?\n    - What should be the minimum wages for unskilled laborer?\n    - What should be the speed limits on highways?",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "f37d8b13-78fc-479e-9b49-ce8d21adc626",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 25,
      "title": "Real Versus Nominal Prices",
      "content": "Comparing prices across time requires measuring prices relative to some overall price level\n  - Nominal price is the absolute or current Re price of a good or service when it is sold\n  - Real price is the price relative to an aggregate measure of prices or constant Re price",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "1a6941db-e58e-4468-b5cf-0166b3e43fb0",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 26,
      "title": "Real Versus Nominal Prices",
      "content": "Consumer Price Index (CPI) is often used as a measure of aggregate prices level\n  - Records the prices of a large market basket of goods purchased by a “typical” consumer over time\n  - Percent changes in CPI measure the rate of inflation",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "c6197988-ec45-4b14-a32f-6c6ef7dd4bcb",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 27,
      "title": "Real Versus Nominal Prices",
      "content": "Calculating Real Prices",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "86aff33a-add2-4052-a17a-df09b520fc26",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 28,
      "title": "Real Versus Nominal Prices",
      "content": "Nominal Price – Absolute price of a good unadjusted for inflation\n  - Price of rice Rs 7/kg in 2000-01 and in 2019-20 price is Rs 40/kg\nConsumer price index – measure of aggregate price level\n  - 2000-01  - base 100; 2019-20 - 800\nReal Price is price of a good relative to an aggregate measure of prices, price adjusted for inflation\n  - at 2000-01 prices for 2019-20 – (100/800*40)",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "d03fe5ac-eacd-4891-a5a8-7cfe4a78deee",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 29,
      "title": "Milk Price paid by Mysore Milk Union to Farmers",
      "content": "",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "24986842-6d36-4f8a-8b73-e55b8065b2d1",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 30,
      "title": "Course Objectives",
      "content": "To analyze firm-level economic problems and understand their consequences, to compare alternative solutions to these problems, to understand the market and regulatory environment in which they operate, and to take informed and appropriate decisions subject to various constraints and targets.\nTo help product managers to identify right markets, product features and understand the characteristics of the market they are operating in and take appropriate decision regarding product and pricing",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "bd6adc53-a0ce-4675-8fc9-148d2516b66d",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 31,
      "title": "Focus of the course",
      "content": "Market mechanism\nConsumer behaviour\nFirm behaviour\nMarket structure, Conduct and Performance",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "fd6a2a37-5378-4f7f-aa54-d25c24f677ac",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 32,
      "title": "Module 1: Demand and Supply",
      "content": "Module provides an understanding of basic determinants of demand and supply, the nature of demand and supply curves and their interaction in the market, and important concepts such as price elasticity of demand and supply and market equilibrium. Relevance of these concepts for product managers is discussed.",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "71001088-a9a0-4b96-8e30-ff23a6ff8423",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 33,
      "title": "Module 2: Consumer Demand and Demand Estimation",
      "content": "Module acquaints students with the basic concepts and theories relating to consumer behavior under certainty. It introduces important concepts such as maximization of utility, budget constraints, preferences, and indifference curves. It explains how consumer preferences can be elicited and can be used as an important input in product development situations. The link between consumer theory and demand curves is also explained. Methods of empirically estimating demand are discussed",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "043c986b-0132-4fa1-94c8-51738c363c08",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 34,
      "title": "Module 3: Theory of Firm and Market Structure",
      "content": "The focus of this module is to explain the main concepts and tools pertaining to production theory. These include a wide range of concepts, such as, total and marginal product, diminishing returns, input substitution, choice of optimal input combinations, returns to scale, costs, revenues, profits, and short run and long run decision making by firms. The link between production theory and the supply curve is explained. This module also covers different types of markets, including, perfect competition, monopoly, oligopoly, and monopolistic competition and their characteristics.",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "265410f9-113d-4fb2-ac32-717fbea36a74",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 35,
      "title": "Module 4: Firm Behaviour, Pricing and Game Theory",
      "content": "The module highlights the sources of differences in these various market structures and the implications for firm and industry output, prices, efficiency, and profits. In the course of discussing these different market structures, the module also touches upon important topics such as pricing strategies of firms, strategic and game-theoretic aspects of firm behavior, cartels and collusion, and competition policies",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "d883d112-5527-45c2-a979-feb0031b6cb6",
      "material_id": "9a09a350-ab6a-4178-b75f-e683198050a9",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "item_type": "slide",
      "item_index": 36,
      "title": "Evaluation",
      "content": "Class Participation -20%\nMidterm exam – 30%\nTerm Paper and Presentation – 50%\n  - Individual – 10%\n  - Group – 40%",
      "tables_json": "[]",
      "created_at": "2026-11-05T22:23:12.341103",
      "filename": "session 1- Introduction.pptx"
    },
    {
      "id": "ad997bfc-ccac-47a8-8ceb-7004354dc5e2",
      "material_id": "aa68a52c-deb6-437e-aa73-849170f15dd1",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "item_type": "slide",
      "item_index": 1,
      "title": "marketing-research-an-applied-orientation_compress",
      "content": "%PDF-1.5\r%����\r\n10727 0 obj\r<</Linearized 1/L 7881507/O 10729/E 55974/N 999/T 7873702/H [ 497 24335]>>\rendobj\r    \r\n10741 0 obj\r<</DecodeParms<</Columns 4/Predictor 12>>/Filter/FlateDecode/ID[<A4EFA385794C4A429522136B56761DC6><2CF1DCC75B96AE49AABC71CE6951A9C5>]/Index[10727 26]/Info 10726 0 R/Length 76/Prev 7873703/Root 10728 0 R/Size 10753/Type/XRef/W[1 2 1]>>stream\r\nh�bbd ``bH� $ g��  �� D�  �  �<�`  �� �:�; �R  \\@�`   �f ����H4�� �w�   �? (\r\nendstream\rendobj\rstartxref\r\n0\r\n%%EOF\r\n         \r\n10752 0 obj\r<</E 33222/Filter/FlateDecode/I 33254/L 33238/Length 24212/O 33184/S 32429/V 33200>>stream\r\nh�lx \\SW��9 ���$�&A�,�$H��^ 1XЄ���� ��M(��� (v�Z',�\"b  -.��B�7 m�c�/,*h� ����` ��D�ֶN�� �� %ܜ�����Y��\\  \r z\rpC L  ��   x�q�� @�D�F*�@ ���%� @}�$b ��] �~C�/�% �dT�� �\r�i�  �B ��� �*�E �����?��4��\"]� ��p�$t�o�2 ����  ?y�~\"!��J��J �$��'�B ��lI�o�y�?�rm����׵ ��f�������DR����� �b[����6�� i��w�   � �P<Ih�� �,!F\" � [ � /����o���0��N ���IG_h,��� �� G� ݒ<�ð� x�(O�;TK �ݖ�\\�  �!9�%�h�� ��y, ��} ���a��  �� �^ ��` �X�� � ~  K� �0 t�4ȴq?���� B;� 2,l ������� �i �op�� H� =�A7-7 �+��B��H�\" � �d�y�_*, ܵp�!f  `F�[ ���n�G ���@(�=+  �m�� M�z �u�?�L v �$���oq��`V�Y� I A��� ��|\n�Qq_ � � ? p �^�� .W���/��ӐFr�i[\r� ��v� Ҍ< �[y3�  ? ��� �0 #�P�_J�2 r ���J�� � .�  ys*> ̑�  ��Z���{ 8�l�sZ%l�yb����]� �\r� �\"�� `3p��\rgE�mF� ���� ��>ǃt�8 �&��� ��u.ײ�:8�� N����b!�t{� � 5Z� h�� �� ٽ��� �ʳ\nt�X�0����� V � 7�y՛ �G����x-W �$�*d��g@7 ��C ~ �B�2�� + V�� � ~ � �� �y[�� �3� � ��Z�G�:�7�� �}��B�?a� �{v>\r�� #$���P��[�Ӏ�C:�π{ |+�YpOp��� �\"�Tz���1߰s��WV| �Ù ��F�_�C'� �b��l1� ��� P��s G��� :�$>��� ��X;� �� N�� �\nw�$q |c�}\r�mş� 6�6��@D� �? �Hޏ�o� g]��m��� d�V �V��\n�\\ �\n�vN �R� �\\ +G��\nH����7$� �Nr'��V\" ~�%^��Vl ٍ{ L�x/� ���_�= ��r,�|!f��u�g���3 ���m�!� ��b�a�TAl  �PED�� ~ . �+�K ·`�B� N;� ~Q��3��0������Z�G ���`�\n��Ub����CB��� ��� H�q?� ;q  ��| &�� ���\nl�y��a!�� �  F\"T ��;�k�F� V����ȝ _ 9�ഊ� < �T���� � �  ���V�-�ya   �(~y�� #~ .Sq  ��)0KrB�I�&pYK��� L\nYV���  ' a�J��8�u ���,� � � ��x\"t3p��+F� ��%J��� w Vx � �}\n�� ��S�x/L �mP��#P� S`@�N V��zȱ ��  �ϒD � <?�?[8���X� ?ټ�Pn�m � / ��<3�Q  �  �]�?�� �5d�\r:�O s���k ? 1+w � �\n�K�] S���p�\r� � ���}�3 ~��t�G�� q�[   n; $��B _ �$�Y(� ��u�¥ �'�����v�2L� 2@� { �q��v؀� �M�X�Wb� �� �����h0�³!f�Ԁ�N�q����� �I\" r,� �k� � Ř ����`D!��/��3� �� SN4{��� &H�m0n�5�GFA ���? w��_����� �I���ˆ�V�c(�q�A� �oX`��F�8���Z�O�K�e��6�4��</0g� R�}  Yy8�A�� �.^$  kq� ��� .1r� WH� �s � �1���9྘� �$9o��vN �k� �j�a��[ �V�4�ca碄ǽ �'�m`P�r��F^3 (� � {\n|g�O@�B�� �ᜏ�k8 � @�H� ����\r�G�� ���I� ��J� � ! �M B�u���*RȁO� �p �_N�  v�B  �>~ |oE��V�: �7x  ���%x��  �۸�� K v � �'W�0��E ds�sp���4Օwh��X4xX�n��I�j�C��4��{ <4�� _8 A�.�� � O��� ���jp߉� 6+N �   :\" |��$� H� di�� �� V�Z 1 W ��0�� CO'� � � y��   a |Q�O� �� ~!9�` Ǣ@� �8���ϩ  V F�*#� �Z�1�  �)���ZP���^�Ve�A8v . � A_+� �[�7� �+�y   E^/�%Z�C�J� �(���� �I� p��+���t�խZ�� ȃ��p�C���5\nK��]�\\��ʾ�nX�\"Y� ,Rq�!�ß�!:�GР�?D �� F y M:���l�-��d��]G< �eG9����=8kD q�H �,�\nx��� [�% �#��%��ػ ~,�.� v�u�ݸ� ��| �O��Fx ,�\n� z��3b�y8d�> {�K�� �K�m�� 6����sI?�d�X � �?�4��w gρ�I V �X���P�|da A��� :��D�H��@bqӍ�eLr�^9U� �*{yq�D�d��\"Y9�J ^Q�b(��S찹 Ey���G�׫iWBhc�s0� L9~AaJ�M� �T�D}�0��Ȉ OKl�d�����،�n� t�j~}�t�:��x뢼��m�D �M��� ��\n���t��[g��ܮ&}��K�2�2���vm�0'B�!��\"�0��x ���f�M�+���ۓ��<�C~�ԡ f(�8�ݒ��� �+Q������y\\��3�`C�̡.Ɍ��䥍�>@��'��\n�ǵ f�tJ��!Wp �?-Bp�t�+�SR�2ㄸ�! \"��sæ�( � �׷mvĹ7m8[ ��Sgg緎�O�b��� ����qQ9��!�D� 7�ޠ ���5GN�[��� ��q��9� �� 4em����_ - ��謂pN�`������ 7��l�<�z�y[vs�G���۷ N:�1����8G� sQ�)5�FT��� S �bT� ��ˈ|����ᆤ���Ex�l����T��)� �e��9xNGZ �bR�U\n��˛���� � \\�� Ֆ��(]�L�]QM���_  OI�ظ�ߜ*����N]�W g���7u<�* K]$���k۳��0~� #�����(�#�o� ��8� 6�Yb��|P�2���c���(�F��V�������^!���Ư(��q� �SW\" ��}����Q )a ���}�� ����� �}3 �sd�9q�����a �C\\��S����B� S��U#kM��jѧ =�e� h� �{�\"�ڋ� �O�7)��C d�ٜ:���ӭ@5�#E�3� ��� �>  ,�μd�b�Ϫ-�;D�ܪY���R)fx ��D�f?�'����\n_¯��V� E��t��\r�]�  n�L|( �V I2���2�I/�9I� �*���B���Ya��ԅ  �Δ0ZNG� �i*� �/Q ����H��tÀ<?v QU�  �D?�G��A��,�3�e��|��B� ���y]` B� �a o�-r�U��G? l�]K��2ˏ�>�/� ���]��l }���� !{   K2� ���{���xV���w�� ,�}��9f�d�B@�<��c l3 � ������[�{�t�Ud�/�  fq~�\\�`UL�,�f1  �3�N��.uw �� �}9�KZ�cQ� ����M�Y���#f���   +�n +���G&�LuLG sh�Z�� ��P1i�� �y���&3��� � �r~P�� @u��S�G�#��,s��Y��W  �/���( �%�@e�a~���QMw�Eͩ�|��  `w��c�R?s-!��7�ՋZR���n����d1 �ʕ   Gw>�A!���j�% d����19�S�_#���� nF�` �e� � �Ǽ iO�1g)`�сDM�� �4�p��� � &�a����  Ϝ?�9Y�K��?� I;І4L .%F��f��70KІ��h��>D]|��|��w�kJ7H�oM�V���1�g{y��4�����K���J&�u�_���\\jՑhbA��l�%Y�D ����+Kz6���e���<Np�*<��WW�7<Ր�Ǩ �E �ј�(� [6���.U��l��Mr�s t�V��  �Ͻ�?�4��W �|H SDi��$���,9��5VQ��F<��E�ĕ�����ȸ!*Q 5R<���3x��}��W�+2�7��\"� ��[k)]�E���Y�Vm �\rm�� ��G�hj d�f�m�x�  4�L� rd�E��� �9 1V����:�A�o��%��W \\X�e #���,�ȼp�< ���t ;_?+�� �_��֞'$�� 5'��5 y [J1D�f\n<&EP�} h S�A2�%=�� b   �{{}�  �ց�)�Umy*�l\n� �*�r@��) qh��\r&td^t/�o�۸��-�� ��� /ё %� ��ks  �n�v�>�q��к� � WP 0���` 3� 1���Y�y�-  ֞�yd�7P0� ��Q���U�\r�2�>Y�n�>�5�c��X�a�F��� �� �t�.��/Q� 4���_b��t �������R�p�� ���� 3Pg�vf��U,� EI��[�rM�\",?�_X� `�|\"�6�0��S �Ϳ@ ]��)E! �.F�@# ���lB2� � Ί�� ��ӛ� m A�$��l�v.\n*i[��$zӑ#m�G�st�@#�7�9T �(E0.�S�#Q N5�ADQ02������O0 �=;h_�뒗�B�  L i�*_���c ������� �g����  �3���\n�\n|*�J  ����Q�BDQ' �[� L � �\r؞��C���M��!�  �� � 9��\n �W� C6]��sy���_��C7�K \n�%�%=����PA �M\"{m�t�s��� ��J]�\" 4���� P�K�nD~�o K�,q%=�4� >֌Q<_�h�Ǯr� ���V��`^\n��[�!�Q7G�Ȍ��F� ��7�H �(  dӁ�b������� x]\"C ?� #�];�n 뢼�Z�^�ී�Z�{��D�QR�^���Φ��̑�Ź�z���x �$���lT�7 4�U8\"Hs�7s�|  �f ���j**ǃ� Ud]�\n�g~y�  �\nz� I 0� ���)6�tzy]�_� ��|c� XE �9\\z@�d�)��m�C6�2҅Mr� ɒ���\\y= �%CI��] M�����ksU�  �g�� e�� Y��Z�F�� !��й4�Q �ؚ��0b �PT�VQ<'�<�b^�\\�F�_�N�I UO� ��ڀ ���$�}V�k��/�P�OU���� ��(B��<�Z@�g!��ۨ&E��E( lA�A2�� ��d� yˢZ �Q at��L5 1� Dy]���CZ��� -{�v� ��-��w6˝����O���.T U�=�E��{ݱ˓ce�wwuf H�(e�yU��Ix�0��0�X�d�w��6u  xa��N�ʏ�-�  �^w�� ���9r��v�G�)� �W�9U.�Q���G5d�}W ٪���1�hǚ��� ���k�� On�]߽xY�mx��ۚp���Vd�L ��w�kR���7#�pϗ�?7���\n��֟����_ � ��\\][P sV~cWԲ�]7��wA����Ԉ/�#�a��+��QW�8���n���[-��H���� �#������_�r���K� �Uw^[�g���a�V� :��3�_&<z@�����:?޷�*��[���  [���Y#Ait������ˌ�� ��!p�}�6�����9� Q ������7c� e ݜq��=<���� UD���5���O�XƋ �y�� �z&�G,*c� x�!i����sL���a����� �tQ�wY����{+�p����˛Rq�  ��\\�<�eLmh�c^� � XOͽ ~���G?�|m����������t����{���qNv�N��_�G�UYe�Qļ�i&) ^�[��X�0sgx� ��̣R�_Љ� �b�ѽ '���; � �=�3�v(�40�~�\n^ g�w�8'��s� �s�<ơ�:Ĝ T�9�G��� �ܮ� �N���I��+;�� � ��1�g�� ՜��^��@��h���WזU  ��o�8 ������#�/�  ML �XeU's�   ���7 �]���\n���y�Y��H}� �N�D!���r�󷞡 '�R���oU r�WY��{�s�>���w тV�}���aћ��K� ʱ#�� �;��E ����Z��f�;��v5�����I�����H\nЈs~ǚ�-7� ɱ�c ' � �$����b쒨��N\\Y���\"cd{A �y�k돌� K�; �x���4' ߵ� /�~t��_�|3F�G\"2�hC`� q#�U`n�9s?uM{ �A��7��2���瑮�#�m��P|uw�vNܨ�����Uk�Ő��l,�ayS�_PB��� ��w�<c ��&�� ����&�x b~���IY �)}7 Y'�c����M�k����p�;e������( �1 ^w�󤓔 F �t�a{� E\n ��'����*��G�m -K- zK>�+���&���K�� �O��)ZN\\+��M}��a�� � 2�7J#�뻐�� �( Xm?i\"�x��7��)���Ώ�~� ���(��K�v S?��X]A� �.�S  �������e US���  u��%seKa��@ a�X�ҁbgh���p=��qr$�'Mg���  0\\���6  +1_^�����!��\r,i�j�Y*�7�.���PG J�� �2����M�-o� `e^�8�%P�T��\nZ% X�/R;�g �$ϋ�M�� �h:;���y(�o n~;��O�u����>�yE ��X^�>��1 ]� -9��\r/��m�b^#C�n϶ ��\\wS��Jt�e �K^h�� t�� =�Q��N� �Jx<+Ƞ�l�G ����  0��X_\ns�,O_�,}�.ȿ� N�P��'( mXP`���mA�Z� �**ԿO� �ܨ���� ��Q��U�ԒK�� 謉 z1:{渧�:i*/�\"�LѢ DE����I\nF��g�*s�Ưs� xI��{�c� �< �>��Y��G�[5~� �1� uI��fj�|_��4\\N�����y �� S]D)j]��6PWvg��]/:�,g�fS� J2Ϸ��0�b�xAI� ]�AWe�V,PW^  �H�����\r>��҉���  ���2 afxն�{�XE�F��(�  �exA��\\I�  ���mA�G;  {��Y�Z��8�j�sz b~��*̲F�� J�o-�8D�J����[�BQ��T ��+*EUnc��}Ym��j�H��d�� ��#�� * �ݷ��� )���qߕM�遉ӭ�y��Q��M�棒@��b>  Tn� >� ��� 7��IR�^Ԩ����]�ڹ6I ��ު�fI�'j��o�3����I�R� �߽�r�4�����z5 5��.» �c'�E  q�ͿWQ'�t�&M�#OS�Z� �j ����2�u��H �/#ƶ+ceƚ�< i��\\�l�#c�8U��j �q �^���L2 f � ��� ĳ �6��K2�  �o?)�P�D u�L�� c I�+d��|WGi� #5�J�4>��w��ox 2Jb�M/�O\rhdN��� � �ABlY��� Tb �qj M��P �i��'0�����D�>*⎦2� tt�oU#� }�I�� �C rF�� �ְre(<�G9\"�͖�LsX_\"iA�Fx j���Y�^t�0� �mB j�  s�k�t? J :�^ڕU����dYCML��k */c� 8�G,�\r��� Qi���S5���)�Ô ��*] �������%R��f L�:�q������ؒ�ۑ�hO0k�zѩ���sCc�k�qO ���  �Q��  vJ�Z=;ѳ�,&5� EJ.Y��;� �G�%�uȳ�} \n#��<T�Z�ڑe���GQ %�T� ��G5��l7�@օ T0��3� �lw�^dLA�q *e� עL�  f����;��T� ^��2�m����; ���k�� e�.y6 ��6F#]��\r�q�?QYr=G�{Û� � �'�C�5� �k��&\n|sm潐 ,�Ē �2뢈���9 �� �He1�41 ����-���nf�Z�� -�2��. �2'@Q�&53�  �: ���l JN��Geּ#�9bζ�l\n>Ҟy0{b i�J �_(� 5�� QOq��j4j�H���tAx'g��]� �\r��'�o5�8�6%K�Օ _��S��_��l n� �3��w*�㳪g�{6!�~ �myzE]���M�m ~R�C-ڪ�v T �\rk>�7ޝ�a�ф=-H n��9 -���Mi��9ܯ��n%�� ��L$��RN-ݑ��*� 7�{6�M �[k� 5>��� \">�� + $u f�{4�D<�l��z��ۻ2'��(*�e���A�@��5{!Gb1bˉ�� ���)[���bK� ṽ\"��]V��'BdA����v���~# �+)�� R;7��!К4F�LixWfSO��Z��W�-�� aG���v��c � �J;͞�y(��s�Q6. � ���;����� O]� \"nv������dI�U�B �� y]�  0����Dd�R�DG.���ܻM=�\\�C䟣.�#=َ�w&�\" �ٵ*���ͩ�� �j�QB��}����'g:� �(ћJݳ��Ԯ��Wn�vg�����Х�J���>����+��Y��̫��z��D9r��\r�:j��� *3 u=�Wdw?�n �b�BaFqڽ�=*��CT� ^W�0�{ 9�H���Q� ���s�� � E ���� ��hrvOS~\\�' ޗ�<c�zE͘7r�۩A/|��TNe��f  ���m��~�����\r���(=M��  C\"]d�n�؝�� ��oI x�YaOѢc����į�zXD<K�Ki���/�^ ���/ � �& 1l � �  \"E\nNHC�   � �$1� ���V�: !h���  Q (H � .UZ{Y� �jD �θ��`;� � o�~~�y���������,g���9� $ ��������}^��e�R h���L���ƪ> ��� 7 �C ��r^ �Ud�D��2acX3 ����9�!Xs � ͤחI} ������ M� {������@�΀,^�*� 5����NWW~��� ��d�� \"�agt�  E-�KS����2.�x��)2 ���]e�F 8�����:� 4!\"]��4 �0�x �T*�-����(����S1, u;5|HRT��?o] ���A��l\n�V- ��  �4 ��\r��9��h��tԓ��   =HÞ�&h2��k�� .�( ��{z ML� �qy�`�`�I�!���k�����͘V> Ie+��In�Af�s2�U�Q��u6U �\n  b F�% �\n��n� / �j i��8�������:��( ���T�[0�3Hvw��/noۘ�A i��  O��#Yiu�W��� �1�f:��\r�~�U9���\"|�eC �s� �U��-&��j�\"�6?Q�aZmB �\\��~]��K��\"@-'�����P�  �� ��(�K4:�/�ŭ���4L��m-�  i)�K�Q@* �� �  �C�`x *\"����w�ȸ��oh �L �\"f�k:���x秛xwE� �.��NE]� ���C�s�隢~��~OG����WY5 je* a�b�����  �є j�Q  � �j�d��lDq ���t?����\n�v�ZA� � /`¼<��� �3 ���ܣF���� ���m  � )n��� �A/���;bfm�I7L�  �1��x!ǃ0|{�[#  B�\"��s����U�5\\dV = \n�Q��v��~���Y \r�X  � �'�(���7!W�# G�D�4�c�\nm��R  � �� �bV��=� GK�6ZF��O&ZH�S]s�l�� ��5���1\n��UΆ 2˟� �k�F� �>�8�{�4& V}SF5�:� � �5��s�� Z.�\\E�&r�9��Q�`�  �ŷo��J ����[/ �Ε� �� \r��� �`�#��:i� �� �pJ�*i~[ Q/���`�tΎ nI��0� �U�U��'&8ñhp�>��K�ю�e�_n�L�h}r��K;% 'N��2����{y���� ֆվ@�� �EeG�+t���&� �n`�=Pd):2&I��5'0����/��Q��o�  {f �^� $�+�-�l���?��՞�]�+Ze��Q�u-2 �M � � eD ���� ���� � �m � �����[��p4a�� [}��v h!�D��6��oR0��V� ��ါDԇ���6�  ���Q��s��� � � )�浏 {~��u�{�\\L>-nEu�",
      "tables_json": "[]",
      "filename": "marketing-research-an-applied-orientation_compress.pdf"
    },
    {
      "id": "0accfc22-02ca-49dc-9f07-7c5619775ffb",
      "material_id": "10c77e1a-d937-46b1-92d0-8f00530d6e71",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "item_type": "slide",
      "item_index": 1,
      "title": "Qualitative_Research_Design",
      "content": "%PDF-1.7\r\n%����\r\n1 0 obj\r\n<</Type/Catalog/Pages 2 0 R/Lang(en-IN) /Metadata 189 0 R/ViewerPreferences 190 0 R>>\r\nendobj\r\n2 0 obj\r\n<</Type/Pages/Count 40/Kids[ 3 0 R 18 0 R 29 0 R 43 0 R 45 0 R 52 0 R 56 0 R 58 0 R 69 0 R 76 0 R 78 0 R 82 0 R 86 0 R 88 0 R 95 0 R 97 0 R 99 0 R 101 0 R 103 0 R 105 0 R 107 0 R 111 0 R 113 0 R 115 0 R 117 0 R 119 0 R 121 0 R 123 0 R 125 0 R 127 0 R 129 0 R 131 0 R 133 0 R 135 0 R 137 0 R 139 0 R 141 0 R 143 0 R 145 0 R 147 0 R] >>\r\nendobj\r\n3 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS6 6 0 R>>/Font<</F1 7 0 R/F2 9 0 R/F3 11 0 R/F4 13 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 960 540] /Contents 4 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n4 0 obj\r\n<</Filter/FlateDecode/Length 995>>\r\nstream\r\nx��W�n�8 } ��#U4,� �X`۴�t� I �!��0�����J����� ��e9N��V_D ��3s8 JwyF %�R�95�i���h����+4˳7' \n�,a a��\\� <�E���1Ռ\nղ�~�ggyv�, %\n�* ]�h &�JxJ���I�!�~�LAGe>���&�m�]���)*F)�5W �� � ��r��*F��� � �)#�&��G2��+�>����ٽ9 �M�D�_�B�&e\"�LR��I �� PP�D�1 � �� ��ϝSJn �\n<��q`_^Me�1 � �V�ɘ �#3T5y �oQԨ�U�����&e\"�- Z������s ZGM�< ���S�I� ���I�n��`{7�O�� 1N�F�k�Sa   Ñ0 �@�iXǸ �������y�78y�? G� �gh4>�Fp�wh(�  � q�4�} �ᓈ 4Z�v��e�^�}4�+6�<4B��B�j���b �&��5�/͚Jb]|G�Oy�a�2�!5`��   ݙ� f�&<*���rXN\nP�W n���B��Y��臼� ��/�pQ0�Gc���c����:� ��6�v�� j�b r���8 xV0��� D��^� � ��a��ݽ_ ��02 N  ut^�p^\nC����[*����Z2È��j ��� �1��-4ïAD�����% � �W�  1��_z4)�I������-�����u��� J �N �ʝ�; sD ��� )$$�Cq�c]Jh ����6�� �6M(� &� \r  ��)����� ��D�:j/�i�g�<�?p/8� �ȶϿr�@]�V ��������.�pi2  �.���i[y\r��lj�:j��%f-�ᒨM�M�ul�!���4�F��#\n�L��i�F�D\\oA�2mO��Cil���u�� ,8�'��K��~  ǂ� �L���z�\"� [xFo�{�;���N]��� �/Ը��:�h� �K8�p@��{ �-�  �u�x�b' ݭ ���.\nBQC%�x� N�\n  �q� * �\nGC�;�f3(Ap<^��h<�.����� _����}� B״���6���\r\nendstream\r\nendobj\r\n5 0 obj\r\n<</Type/ExtGState/BM/Normal/ca 1>>\r\nendobj\r\n6 0 obj\r\n<</Type/ExtGState/BM/Normal/CA 1>>\r\nendobj\r\n7 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F1/BaseFont/BCDEEE+Calibri-Bold/Encoding/WinAnsiEncoding/FontDescriptor 8 0 R/FirstChar 32/LastChar 183/Widths 153 0 R>>\r\nendobj\r\n8 0 obj\r\n<</Type/FontDescriptor/FontName/BCDEEE+Calibri-Bold/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 536/MaxWidth 1781/FontWeight 700/XHeight 250/StemV 53/FontBBox[ -519 -250 1263 750] /FontFile2 151 0 R>>\r\nendobj\r\n9 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F2/BaseFont/BCDFEE+Cambria-Bold/Encoding/WinAnsiEncoding/FontDescriptor 10 0 R/FirstChar 32/LastChar 122/Widths 154 0 R>>\r\nendobj\r\n10 0 obj\r\n<</Type/FontDescriptor/FontName/BCDFEE+Cambria-Bold/Flags 32/ItalicAngle 0/Ascent 950/Descent -222/CapHeight 778/AvgWidth 600/MaxWidth 2482/FontWeight 700/XHeight 250/StemV 60/FontBBox[ -1110 -222 1373 778] /FontFile2 155 0 R>>\r\nendobj\r\n11 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F3/BaseFont/BCDGEE+Calibri-Italic/Encoding/WinAnsiEncoding/FontDescriptor 12 0 R/FirstChar 32/LastChar 183/Widths 159 0 R>>\r\nendobj\r\n12 0 obj\r\n<</Type/FontDescriptor/FontName/BCDGEE+Calibri-Italic/Flags 32/ItalicAngle -11/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1984/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -725 -250 1260 750] /FontFile2 157 0 R>>\r\nendobj\r\n13 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDHEE+Calibri-Italic/Encoding/Identity-H/DescendantFonts 14 0 R/ToUnicode 156 0 R>>\r\nendobj\r\n14 0 obj\r\n[ 15 0 R] \r\nendobj\r\n15 0 obj\r\n<</BaseFont/BCDHEE+Calibri-Italic/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 16 0 R/FontDescriptor 17 0 R/W 158 0 R>>\r\nendobj\r\n16 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n17 0 obj\r\n<</Type/FontDescriptor/FontName/BCDHEE+Calibri-Italic/Flags 32/ItalicAngle -11/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1984/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -725 -250 1260 750] /FontFile2 157 0 R>>\r\nendobj\r\n18 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS6 6 0 R>>/Font<</F5 20 0 R/F6 22 0 R/F1 7 0 R/F7 24 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 960 540] /Contents 19 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n19 0 obj\r\n<</Filter/FlateDecode/Length 1134>>\r\nstream\r\nx��XMo�F � ��S� ��~/�  ��6�S�����A�(��D�\\�n�}g�rl)J!��A 8\\ ��{;;�w�� �� R)�!s � P���� (��_/�X��~O���`��vg��M���߻�1q�4ZX  <~�F�  ������\\�_�` 7`��N���<I����\r�JK�� ���~|������}�CH +� �� l�H �U ��p�[�w~} R  ��]�� <s  ׏P�ӈ¥�ȧi����A�v��/�<Z�n_6�+Й�VA�%ޠ%Sߣ}� $(Åڝ��ܘ �ȸ��h�,�We\"-[׉Ԭ�n0ޓ5F�u� @T^s� Q�@� Y�� ��\rď G v�H��a�dl ����X��) h�� Z�I9.p�b��L�� FtƵ{9#��� ��[��\"���|� )�h&_��! v������  ���͘\"�(���8I1�Ȍ`9��2�C� , G�&�4 ��\"�����Ma}�C �YѰ\n �oUN �.�c  �� �Ƌ �2g��XU ~��u�R��ڲS��n� �D���#�,� h� �gb)� ��-��܍�)t�Qg���=ƺ�#�j %� �?��X�QDmq� ڛa�q2� ��qZՔ��.���q/�C tɗ�h�/�K�s!� 2͆ o��B� � � ,�d~ G��!�x��G�; �wd% [��O��\"�� \r ��k �� =���*T3p;x��a �\r�)��z��K �Ӭ��Kw��@;�j �F<�X�t� Ә�m1�_  �`1�� �\"a��o�6뢤�| 7� +o�� �| Kh� �}�ƥ�g�1�4��bI]̳�� �yy M���)�y2p�\n�)���,Q���pt�\"�}��WY�25�]Ѳ��Mǫ�9�S� ۗɆ� ���/T�  �i &�5 !֖]��JdƷEܩz�J�����(�e5�������: ��� , (�i?�� � J탂� �N k�V�sh�D�jt � _l]/(�^�`��P'ET1u�3�  X�9�N���v��Tpo[Ϡ[ g)�����j��M�i.c� nh1 �1� n+��5e� );���c��^��+:�8]���&J�   M�� 4�_�&Q ;#Z��� � �) }&r\"J��XQS b����� �?�D�7/�>� \\�a� ���ئ��HjjM�uq ��[:q�D:F� �rIgC�-�@� tR�B�O� 2G�\r\nendstream\r\nendobj\r\n20 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F5/BaseFont/BCDIEE+SegoeUI-Bold/Encoding/WinAnsiEncoding/FontDescriptor 21 0 R/FirstChar 32/LastChar 122/Widths 163 0 R>>\r\nendobj\r\n21 0 obj\r\n<</Type/FontDescriptor/FontName/BCDIEE+SegoeUI-Bold/Flags 32/ItalicAngle 0/Ascent 1079/Descent -210/CapHeight 728/AvgWidth 590/MaxWidth 2572/FontWeight 700/XHeight 250/StemV 59/FontBBox[ -573 -210 1999 728] /FontFile2 161 0 R>>\r\nendobj\r\n22 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F6/BaseFont/BCDJEE+Calibri/Encoding/WinAnsiEncoding/FontDescriptor 23 0 R/FirstChar 32/LastChar 183/Widths 167 0 R>>\r\nendobj\r\n23 0 obj\r\n<</Type/FontDescriptor/FontName/BCDJEE+Calibri/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1743/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -503 -250 1240 750] /FontFile2 165 0 R>>\r\nendobj\r\n24 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDKEE+Calibri/Encoding/Identity-H/DescendantFonts 25 0 R/ToUnicode 164 0 R>>\r\nendobj\r\n25 0 obj\r\n[ 26 0 R] \r\nendobj\r\n26 0 obj\r\n<</BaseFont/BCDKEE+Calibri/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 27 0 R/FontDescriptor 28 0 R/W 166 0 R>>\r\nendobj\r\n27 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n28 0 obj\r\n<</Type/FontDescriptor/FontName/BCDKEE+Calibri/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1743/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -503 -250 1240 750] /FontFile2 165 0 R>>\r\nendobj\r\n29 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS6 6 0 R>>/Font<</F5 20 0 R/F6 22 0 R/F7 24 0 R/F8 31 0 R/F9 36 0 R/F1 7 0 R/F10 38 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 960 540] /Contents 30 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n30 0 obj\r\n<</Filter/FlateDecode/Length 1675>>\r\nstream\r\nx��X[o G ~G�?��n �sߙ�\"2 NT�i�����  �x+`1���=��,6 �f��^�v�;�9gn� �  BH�D�� � �Ve��� [t;?��l�t��H6�N N\nmwf_��v~�vna ͐F �� ��+�zi�V\\ vu���.��\nn�1� �]͑�  v l�VZ�Ք 9B�?��]��gvY�fU�S�bʪE�� �ܔ�# ��eM �b����\\��\r~Ε�~ ~���*��]��� ��� �  ~���  �IǵJ 9� ��� ��|�](@�  )Z|��FsŌ ��ͷM�-3�  �^yf 724�q�c���7 3�p\\���:�}����&� ��p B\\Imɍ3,�� �ai�؀� El�ʄ1� {� �� ��& ���F�Ԯ*\n� Ӟ� 7�# u&Da���B�a�g΄, ��B  � �I�/p�-\rK Ӆ�C���s�(�2y �a��'�� �p�o iA Т�� p�v��B ���2>  !#�qYDw!���\r#�gs�\\[�W 4}H�V��  �\\�Vp�\\��^�Gy�m�z��;Z�Re� }�5[��9���� X ��(�� ~F H�aI=��c� \r���Z�9k�� Y  ��?�Wy�Y\r��� �;�!Bi;  �U \\Dr붡�=  �z #?bpE9��j��t�K�AxuYғB=٨�y���s�Mڪaϳ�  �b[��X�y� �`1��� Kv{7�Ud��l�od��5X  �m��n��\\��JtG��o� yKx�0<�1��'= �x8��|�� hYP�  \"�   ,�9�}l�!>}}� �{�,M qj  s# lB�� ,�R@   ��c_(pN�q�ȸ�={\\JC���� #�� � B�- �����$ n� ��Κ��v]�8� A� \r�JY�ZH��RFl�F�4\"&� � e ��B���p�I������VkH& �B/�tH�b� M }�(�x�� �ٻ���A��� �|�ܲ{���� < > @�  ^ �U��0娐� �$�R�� w8 H�Q- �j��n  u��N��ݭ�78�g��:��=� �r]M ��� �����v,e�] ~�㹄H� �c�,&w� `��CmL���T_���8=�J<�ӭ x*jH��s �E τl Y�IK#�fM)R��T�3�f�� ih4{�{x\n�q��!�#2�IUbׂ @�ϓ�} �ޥ �*�R���d �o��ClP��<�)AxLv ˔ %��2%H�5#Qj�i \\Jm(\"� q%�%W6�D&V i�m��Pl˔�1�4 >�I��G�B �/�� v � �� JB�� �kOub�֍�{S�����>��D�+�� o4� � �gh�l �]�$�&}���� �2����iq슋� z�  }*�hġ /b��� Ɉ����R r� X�c�`S���+X> ��� Sp �� ,�K��#wU,_�2 �9v ��ǤXcڇ=M��c�'N��5P]�b �J�X<�(+w�    oxҜ�y�E� ֖�U�`w��\nC� S�.��) ' ��p����#p���\n����p�6C�d  ���ql5m�bX(� �Y��U�D�0�*�XD�J �0� ��� ���!��#R׭Of) n�7 fw� ��W:O�]�c��~�n��:�no��T�S ]���; �/*l����  �B ��S���Bc=pH���t�| �P�� )����)�^��U�Q\\��s�S�c�]�t�1� ='c -舙��Yd�,� �٢ޜ\\�`�~��)�[#�\".��\r��F3�_)�{V}� �ۨ\r\nendstream\r\nendobj\r\n31 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDLEE+Cambria-BoldItalic/Encoding/Identity-H/DescendantFonts 32 0 R/ToUnicode 168 0 R>>\r\nendobj\r\n32 0 obj\r\n[ 33 0 R] \r\nendobj\r\n33 0 obj\r\n<</BaseFont/BCDLEE+Cambria-BoldItalic/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 34 0 R/FontDescriptor 35 0 R/W 170 0 R>>\r\nendobj\r\n34 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n35 0 obj\r\n<</Type/FontDescriptor/FontName/BCDLEE+Cambria-BoldItalic/Flags 32/ItalicAngle -12.4/Ascent 950/Descent -222/CapHeight 778/AvgWidth 585/MaxWidth 2488/FontWeight 700/XHeight 250/StemV 58/FontBBox[ -1110 -222 1378 778] /FontFile2 169 0 R>>\r\nendobj\r\n36 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F9/BaseFont/BCDMEE+Cambria-BoldItalic/Encoding/WinAnsiEncoding/FontDescriptor 37 0 R/FirstChar 32/LastChar 121/Widths 171 0 R>>\r\nendobj\r\n37 0 obj\r\n<</Type/FontDescriptor/FontName/BCDMEE+Cambria-BoldItalic/Flags 32/ItalicAngle -12.4/Ascent 950/Descent -222/CapHeight 778/AvgWidth 585/MaxWidth 2488/FontWeight 700/XHeight 250/StemV 58/FontBBox[ -1110 -222 1378 778] /FontFile2 169 0 R>>\r\nendobj\r\n38 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDNEE+Calibri-Bold/Encoding/Identity-H/DescendantFonts 39 0 R/ToUnicode 150 0 R>>\r\nendobj\r\n39 0 obj\r\n[ 40 0 R] \r\nendobj\r\n40 0 obj\r\n<<",
      "tables_json": "[]",
      "filename": "Qualitative_Research_Design.pdf"
    },
    {
      "id": "14be21f5-8df7-48ac-b5cf-96e9e2e2ef8d",
      "material_id": "3d045fd1-213d-4d8b-973e-ef138575431b",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "item_type": "slide",
      "item_index": 1,
      "title": "Research_Design_Blueprint",
      "content": "%PDF-1.7\r\n%����\r\n1 0 obj\r\n<</Type/Catalog/Pages 2 0 R/Lang(en-IN) /Metadata 197 0 R/ViewerPreferences 198 0 R>>\r\nendobj\r\n2 0 obj\r\n<</Type/Pages/Count 41/Kids[ 3 0 R 27 0 R 38 0 R 47 0 R 49 0 R 56 0 R 58 0 R 60 0 R 67 0 R 81 0 R 83 0 R 85 0 R 87 0 R 89 0 R 91 0 R 93 0 R 95 0 R 97 0 R 99 0 R 101 0 R 103 0 R 105 0 R 107 0 R 109 0 R 111 0 R 113 0 R 115 0 R 117 0 R 119 0 R 121 0 R 123 0 R 125 0 R 136 0 R 138 0 R 140 0 R 142 0 R 144 0 R 146 0 R 148 0 R 150 0 R 152 0 R] >>\r\nendobj\r\n3 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS6 6 0 R>>/Font<</F1 7 0 R/F2 9 0 R/F3 11 0 R/F4 13 0 R/F5 18 0 R/F6 20 0 R/F7 22 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 960 540] /Contents 4 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n4 0 obj\r\n<</Filter/FlateDecode/Length 1614>>\r\nstream\r\nx����n 7 �� � x� �[� �a���m�4� ���E�n$����r�>Y_�3 r � ÛU.����� ? ����t� �8�BJ�X�� �٦�N~}�V��w/.\r��B�J  u�QpU�m�1��+ӳ~�l:�e:��� ^ �)��ُ5`\"���6�]��N�`����h~3��]������|~ɕ��� ��9;� �H �ޯ �l�F��NJ.*���أ3�� >BSq#�W�T\\� Cb TF�)Cb�4Wm����� �j�ڌ!��> ޙ�� 9ctga���� _��r�f ��u� �f ��9sܴyB� u��j�����6eH|� zc۔!��y?���]�<$��6 �& �ǜy%�0g�i �Ct *g� ݋\n ��%� �H�� �Ey  �z!=v_��� /Q��E�nOP�MK*� y��&3g»�ȓ ݋���'=61o{  ��=Q�!Q��5Mh��0����  %� &��f�����z@�9 m�+6��v\\�%�[<� ��3�J1�ߊ�� axq 7� ���%�s��b�UD� �^c�/^�3�7���eO��>%�}k ����VA�����-��3�  �)_��w6�q:9�=\r0�\n �GX Xn\\$,� /��E)yQ���6���� ��⬾]�W  PL�*�{�u�̐ �-0����B � ��� \n\n� ]�\\�� 6��v`� �ڍT�K�� )���/� e�$Fx  �  } k�) ���@�og��^�s.N  �<�Cّ=�\"sƅ} ���@��\"�nm.��;� MN�[8�:�w|4��f��J�J�'��8  �Rp.  �G0  G   �c  ���#��  �r p��;�g�>���АP�G�S��pp �8d8\\z�Y *g� E�ǽ[#  ���A kP1����S �^�[��u�`��P�7�*ػ�  �� o V�b��F� �\r��)��u)|� ^꫻m�q����r�XcKw[V��� kRӥ-n�z�\\�ٿ뻪�S /   e�kz� �R�9[q =��[ <��¯E�\n�� x�J&I�ְb� ހ� Y� �� u��(��T�  �Z� �'��R�۵;�^�g[ ����}��4�'}�B�\n��\r��  m+�3  [ �a�����ĝL�K��G:�#��)5� &��B�F�@G� h y �|� )�� d 2k \" �# �T �5 �6� J ᘨZ��r��NH�a�� � � =�@�M7̑0J(  )�ݡ sHw&q�  ��]�@��@}�Q �r��I�P7fY�>'���]D��l �;�H�d��0Ǣ `�  1��1*�bJe�Y' �&)�r��� F8'��cp�n�j8�� ɐ@R� drH�(�l�\rt$�xt n �7}�Z�)��$���Ǵ����o�\rE\r �e��6� �΢H R�H���� z �g�Nh#��\nȩ��.v�y �A�t� BL���  �� ��yAf�F���!��r��NH�ad� m0�C�H�d��@G i`�UC���>H ��u^,Y' .�f��le \r�N� [ �;����]N:S$C��۝ ���n' �-�!�� �X5��2 x �$��.�1է l� b ���Õ\"�-���x�Wūx}��i[ �7p�� {� �X2c%>  ��\rZh_ɡ� r�����=| ? � ��| O  ���r ��-  6x��^_�  J���� ѷ�lCEW��� \nMqۧ�?�J��\r\nendstream\r\nendobj\r\n5 0 obj\r\n<</Type/ExtGState/BM/Normal/ca 1>>\r\nendobj\r\n6 0 obj\r\n<</Type/ExtGState/BM/Normal/CA 1>>\r\nendobj\r\n7 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F1/BaseFont/BCDEEE+Calibri-Bold/Encoding/WinAnsiEncoding/FontDescriptor 8 0 R/FirstChar 32/LastChar 215/Widths 158 0 R>>\r\nendobj\r\n8 0 obj\r\n<</Type/FontDescriptor/FontName/BCDEEE+Calibri-Bold/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 536/MaxWidth 1781/FontWeight 700/XHeight 250/StemV 53/FontBBox[ -519 -250 1263 750] /FontFile2 156 0 R>>\r\nendobj\r\n9 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F2/BaseFont/BCDFEE+Cambria-Bold/Encoding/WinAnsiEncoding/FontDescriptor 10 0 R/FirstChar 32/LastChar 121/Widths 159 0 R>>\r\nendobj\r\n10 0 obj\r\n<</Type/FontDescriptor/FontName/BCDFEE+Cambria-Bold/Flags 32/ItalicAngle 0/Ascent 950/Descent -222/CapHeight 778/AvgWidth 600/MaxWidth 2482/FontWeight 700/XHeight 250/StemV 60/FontBBox[ -1110 -222 1373 778] /FontFile2 160 0 R>>\r\nendobj\r\n11 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F3/BaseFont/BCDGEE+Cambria-Italic/Encoding/WinAnsiEncoding/FontDescriptor 12 0 R/FirstChar 32/LastChar 117/Widths 161 0 R>>\r\nendobj\r\n12 0 obj\r\n<</Type/FontDescriptor/FontName/BCDGEE+Cambria-Italic/Flags 32/ItalicAngle -12.4/Ascent 950/Descent -222/CapHeight 778/AvgWidth 542/MaxWidth 2327/FontWeight 400/XHeight 250/StemV 54/FontBBox[ -1105 -222 1222 778] /FontFile2 162 0 R>>\r\nendobj\r\n13 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDHEE+Calibri-Italic/Encoding/Identity-H/DescendantFonts 14 0 R/ToUnicode 163 0 R>>\r\nendobj\r\n14 0 obj\r\n[ 15 0 R] \r\nendobj\r\n15 0 obj\r\n<</BaseFont/BCDHEE+Calibri-Italic/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 16 0 R/FontDescriptor 17 0 R/W 165 0 R>>\r\nendobj\r\n16 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n17 0 obj\r\n<</Type/FontDescriptor/FontName/BCDHEE+Calibri-Italic/Flags 32/ItalicAngle -11/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1984/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -725 -250 1260 750] /FontFile2 164 0 R>>\r\nendobj\r\n18 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F5/BaseFont/BCDIEE+Calibri-Italic/Encoding/WinAnsiEncoding/FontDescriptor 19 0 R/FirstChar 32/LastChar 215/Widths 166 0 R>>\r\nendobj\r\n19 0 obj\r\n<</Type/FontDescriptor/FontName/BCDIEE+Calibri-Italic/Flags 32/ItalicAngle -11/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1984/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -725 -250 1260 750] /FontFile2 164 0 R>>\r\nendobj\r\n20 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F6/BaseFont/BCDJEE+Calibri/Encoding/WinAnsiEncoding/FontDescriptor 21 0 R/FirstChar 32/LastChar 122/Widths 170 0 R>>\r\nendobj\r\n21 0 obj\r\n<</Type/FontDescriptor/FontName/BCDJEE+Calibri/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1743/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -503 -250 1240 750] /FontFile2 168 0 R>>\r\nendobj\r\n22 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDKEE+Calibri/Encoding/Identity-H/DescendantFonts 23 0 R/ToUnicode 167 0 R>>\r\nendobj\r\n23 0 obj\r\n[ 24 0 R] \r\nendobj\r\n24 0 obj\r\n<</BaseFont/BCDKEE+Calibri/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 25 0 R/FontDescriptor 26 0 R/W 169 0 R>>\r\nendobj\r\n25 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n26 0 obj\r\n<</Type/FontDescriptor/FontName/BCDKEE+Calibri/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1743/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -503 -250 1240 750] /FontFile2 168 0 R>>\r\nendobj\r\n27 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS6 6 0 R>>/Font<</F8 29 0 R/F9 34 0 R/F6 20 0 R/F10 36 0 R/F4 13 0 R/F5 18 0 R/F7 22 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 960 540] /Contents 28 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n28 0 obj\r\n<</Filter/FlateDecode/Length 1083>>\r\nstream\r\nx��VK��6 � ��Q^ �ޒ���$��hom ��؃'Q ��3�8;�_R�3�͠�� [�ȏ )�η� �8�BJ�Hn91��6L'~ �t���? ٝ� Av en W����t��t�\rt��Њ ¯ .V�z뉒�k��\"4� A g�h��du@$�-x n�J�v  ������?O'_�/4�ꦐ ��  Ź��� ~�� epf쓎��L��3��hc ��=�v�W��u:��� �W\"VV3.�=�7B��l �k�Wβ܍�2ǔ�   � �%�+���b&b>�n l$ `�M�b# !�cm��L�%9����r�Yn��L�>:k D`=F��{-M�V/3\rX� D4�썵b�h��'����Ӏ~ � 9�)p���Ӊ��i= j x�/ � f{�a�>�2n�`  �a�<S�Gq U��� ��B܂Y�/n#� !�{t�ڧ>��� 8�/o!zPֳ|�0᱖ �\\\rW�J�n`��$ݗ]6S�d��BӅf�i Hu\"�1�<����f�� �~��8�i�f��rS�AZ�uf�#�\r� ���� ]`#[J )�~�Vzμ��U�jT��e���}-  J�r���y$�GX󴶷io���s.ħ$� g/3,�� ΁>̿�qS �l�|�.G������~�O 2�2��|PC3p�=��\ng �*t�  �b��i �'7�*� �I.\"�\"�;���\\.�%� �>g��/l>��\"�  ٱ���Y �f��PxaR��D,�SB�8%�'�~��� &Q$Xe�Ge� 3oV��L��&���8 � u =�eB�Pc (zn�f�����Pb�t����`��/�)͈O�*�@ �m�L(��3�;W��t� C���t���ʻ V #��b�[Z6 �la �<��L�d�� 0yJ�1\r �f9\r�  ��t�� �كӞO �t9�:48cRj�5  M �n UJ�E:�&�ʫ�2T��a?&��pBRծ!w�9ܷU 1wc �k �48��r��uz��k|�`� 9�o�\r�ǧ:  �*��y��b,���:��Ȧ�b�n3�hH6\r\n�y��P b)A�jz<CA�m�Lx�w&�����i,'��=�  �Eg� JX �ރ��*�Z�Jɴ �$,�#~_�]l� �]l��Ư�!���� ���G���O�WC� -��]\r\nendstream\r\nendobj\r\n29 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDLEE+SegoeUI-Bold/Encoding/Identity-H/DescendantFonts 30 0 R/ToUnicode 171 0 R>>\r\nendobj\r\n30 0 obj\r\n[ 31 0 R] \r\nendobj\r\n31 0 obj\r\n<</BaseFont/BCDLEE+SegoeUI-Bold/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 32 0 R/FontDescriptor 33 0 R/W 173 0 R>>\r\nendobj\r\n32 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n33 0 obj\r\n<</Type/FontDescriptor/FontName/BCDLEE+SegoeUI-Bold/Flags 32/ItalicAngle 0/Ascent 1079/Descent -210/CapHeight 728/AvgWidth 590/MaxWidth 2572/FontWeight 700/XHeight 250/StemV 59/FontBBox[ -573 -210 1999 728] /FontFile2 172 0 R>>\r\nendobj\r\n34 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F9/BaseFont/BCDMEE+SegoeUI-Bold/Encoding/WinAnsiEncoding/FontDescriptor 35 0 R/FirstChar 32/LastChar 122/Widths 174 0 R>>\r\nendobj\r\n35 0 obj\r\n<</Type/FontDescriptor/FontName/BCDMEE+SegoeUI-Bold/Flags 32/ItalicAngle 0/Ascent 1079/Descent -210/CapHeight 728/AvgWidth 590/MaxWidth 2572/FontWeight 700/XHeight 250/StemV 59/FontBBox[ -573 -210 1999 728] /FontFile2 172 0 R>>\r\nendobj\r\n36 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F10/BaseFont/BCDNEE+Cambria-BoldItalic/Encoding/WinAnsiEncoding/FontDescriptor 37 0 R/FirstChar 32/LastChar 121/Widths 178 0 R>>\r\nendobj\r\n37 0 obj\r\n<</Type/FontDescriptor/FontName/BCDNEE+Cambria-BoldItalic/Flags 32/ItalicAngle -12.4/Ascent 950/Descent -222/CapHeight 778/AvgWidth 585/MaxWidth 2488/FontWeight 700/XHeight 250/StemV 58/FontBBox[ -1110 -222 1378 778] /FontFile2 176 0 R>>\r\nendobj\r\n38 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS6 6 0 R>>/Font<</F8 29 0 R/F4 13 0 R/F5 18 0 R/F2 9 0 R/F6 20 0 R/F7 22 0 R/F11 40 0 R/F12 42 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 960 540] /Contents 39 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n39 0 obj\r\n<</Filter/FlateDecode/Length 1735>>\r\nstream\r\nx��XKo�8 � � � {���- ( �13��v��  {H 7�N�dl����KJ��� P� ��D�%�&)~�~N'�0� �B0KRÈV���t��w��N>|��ɪ�y�� �r-�W&�\\����L�g���N��N~�B���d��  �nA˧�HA�Q��~:�0� N4��(#� � �W�\"�,���t����+5�)  i SW�\\3��\\ �ɖT����9<  ��˰ D���/�� \\� J���s� ��c[� Yi��� J�|��]Wz�7��s:�x��+� NSs�)�P!�S �  |R���%x�)o(x�s6�` �7� ��@���'׌_i��4:��v*zŽ�i \\���5�D{�Sa/�P�8)�̓)s���D' �n1L�p4�� ./Z��5��W꫹v  D|b�|\n���$�\"����DԞv�9���� �Hec z% �.� ԀRQ �l4���P����41�N뗏s}ѹ \\װQ�� V�6� �R�`f ʥ[�ӆ%�vɕ��r2Mi�#��lS䱉�1 QM ����XE$N�z�oH<K\"��\\Gy,� �b�$���ů\nY5�X 8� ~>�S<�^�9�iW�w �.�69,&���m�}E�4zZ��F�H��-��+Fj��� 2��1�c4��x���C�\" s -V΍ p_M��E� �9}�XI+�L{؛/2�  ����hQl eNp��bΣ�P���>� �ɀ�T0 �Jk�@I*� t�<��FLQ�Z� ei*�J��@dӉ�� � �  �2�0���4� �iqk���P����  �y1P�D1NK�`�7#а4   �|/' �\nX�����p���u�% /a-�\n�O�� D�4I�������#�xn � �M�����~��",
      "tables_json": "[]",
      "filename": "Research_Design_Blueprint.pdf"
    },
    {
      "id": "8288a3c0-9368-4cd3-a272-78a2c3550741",
      "material_id": "9a2fe269-2502-4a8b-a9b4-6fc3dd2b2a7c",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "item_type": "slide",
      "item_index": 1,
      "title": "S1 Introduction to the course",
      "content": "%PDF-1.7\r\n%����\r\n1 0 obj\r\n<</Type/Catalog/Pages 2 0 R/Lang(en-IN) /Metadata 160 0 R/ViewerPreferences 161 0 R>>\r\nendobj\r\n2 0 obj\r\n<</Type/Pages/Count 26/Kids[ 3 0 R 16 0 R 26 0 R 32 0 R 35 0 R 44 0 R 47 0 R 54 0 R 56 0 R 63 0 R 65 0 R 76 0 R 78 0 R 80 0 R 82 0 R 84 0 R 86 0 R 88 0 R 90 0 R 92 0 R 94 0 R 96 0 R 98 0 R 100 0 R 109 0 R 121 0 R] >>\r\nendobj\r\n3 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS8 8 0 R>>/Font<</F1 6 0 R/F2 9 0 R/F3 11 0 R/F4 13 0 R>>/XObject<</Image15 15 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 720 540] /Contents 4 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n4 0 obj\r\n<</Filter/FlateDecode/Length 621>>\r\nstream\r\nx��UMo�@ �[��������wom�6J��j@�!��\" D\rF1���ߙ\rP  �� ���x���y�S�i�Jk�D���48��k��� �yvy5v0[� �l[�=j� �� y�-Ϟ�&U��(�>�����~B0Q�`ar/��1 �3�  i����f ���H|  ��%V!�:�s�g�ŗ��Yڢ� � �#_�4���L7�C� &�����?p�\n��@6(�S��L���Lly�:��(���� A��� Ϣ����)�ˑ)��òe��/YQ[�� �KN<w�fH��y_IW� _ � 0o ������� 0�z� ���{ ���X�|��k� �Sަ�M*3�-���\n 젃�ۂ��԰r =� * ; ��z� �)�\"iV��  � p^[�y�P� p<7g�\r��Y'4��������Mo��� H�?���f8��8�P��+ ��Q�p ��_ �~v=����1�� ���i���q�� 5#� j�NZ���l�\r�kb� �6 r� �k� ����� �ã /��\\��7�  !B �� 0 ��6~�} X�����   ֱ� 7��o�u�M�����0������w ���^j���'��&�  ��b,}ad�5�HV$9��  �����[���L~��d 6gw\n� ~y��g\r:�� �� *�i9\r\nendstream\r\nendobj\r\n5 0 obj\r\n<</Type/ExtGState/BM/Normal/ca 1>>\r\nendobj\r\n6 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F1/BaseFont/BCDEEE+Georgia-Bold/Encoding/WinAnsiEncoding/FontDescriptor 7 0 R/FirstChar 32/LastChar 116/Widths 126 0 R>>\r\nendobj\r\n7 0 obj\r\n<</Type/FontDescriptor/FontName/BCDEEE+Georgia-Bold/Flags 32/ItalicAngle 0/Ascent 917/Descent -217/CapHeight 756/AvgWidth 513/MaxWidth 1486/FontWeight 700/XHeight 250/StemV 51/FontBBox[ -190 -217 1295 756] /FontFile2 127 0 R>>\r\nendobj\r\n8 0 obj\r\n<</Type/ExtGState/BM/Normal/CA 1>>\r\nendobj\r\n9 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F2/BaseFont/BCDFEE+Georgia-Italic/Encoding/WinAnsiEncoding/FontDescriptor 10 0 R/FirstChar 32/LastChar 117/Widths 128 0 R>>\r\nendobj\r\n10 0 obj\r\n<</Type/FontDescriptor/FontName/BCDFEE+Georgia-Italic/Flags 32/ItalicAngle -13/Ascent 917/Descent -217/CapHeight 756/AvgWidth 449/MaxWidth 1393/FontWeight 400/XHeight 250/StemV 44/FontBBox[ -196 -217 1197 756] /FontFile2 129 0 R>>\r\nendobj\r\n11 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F3/BaseFont/BCDGEE+BookmanOldStyle/Encoding/WinAnsiEncoding/FontDescriptor 12 0 R/FirstChar 32/LastChar 120/Widths 130 0 R>>\r\nendobj\r\n12 0 obj\r\n<</Type/FontDescriptor/FontName/BCDGEE+BookmanOldStyle/Flags 32/ItalicAngle 0/Ascent 942/Descent -225/CapHeight 716/AvgWidth 492/MaxWidth 1503/FontWeight 300/XHeight 250/Leading 49/StemV 49/FontBBox[ -186 -225 1317 716] /FontFile2 131 0 R>>\r\nendobj\r\n13 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F4/BaseFont/BCDHEE+BookAntiqua-Bold/Encoding/WinAnsiEncoding/FontDescriptor 14 0 R/FirstChar 32/LastChar 121/Widths 132 0 R>>\r\nendobj\r\n14 0 obj\r\n<</Type/FontDescriptor/FontName/BCDHEE+BookAntiqua-Bold/Flags 32/ItalicAngle 0/Ascent 923/Descent -265/CapHeight 726/AvgWidth 459/MaxWidth 1327/FontWeight 700/XHeight 250/Leading 17/StemV 45/FontBBox[ -134 -265 1193 726] /FontFile2 133 0 R>>\r\nendobj\r\n15 0 obj\r\n<</Type/XObject/Subtype/Image/Width 300/Height 168/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Interpolate true/Length 4085>>\r\nstream\r\n����  JFIF     � �  �� ZExif  MM *                 J            Q           Q          %Q          %      ��  ���� C \r \n \n \r     \r  !     (   !0*21/*.-4;K@48G9-.BYBGNPTUT3?]c\\RbKSTQ�� C       '  'Q6.6QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ��    � ,  \"       ��                             \n �� �                }        !1A  Qa \"q 2��� #B�� R��$3br� \n     %&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������                             \n �� �                w       !1  AQ aq \"2�  B���� #3R� br�\n $4�%�    &'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz��������������������������������������������������������������������������          ? 娢��O (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� +Q<;��K\"i�20�  �Y}��t�� Z� � � �Es׬�Z��i*���uv�GԵ ���r� m��q�O֩������+������ ���+UZ�� dM()˕�uwiqep`���� J�^j$Vw �Y��*��] ��h�������o �ځ@� �(b9U `~9�*ܴ���.j� ����\" ]2� �Ƀ� w�#:�� '��v��\"�u),c�i�<oc&�  ���Z�� ����  � � ��j�y+��:tS���� �+�\"�tb��� EhC��bxRh���9 2�   A�Ws���{��|� M��2I��^àȽ�� ׬_� ��VT�DQ��6������� �� ^�G��̹��$ \\��>��u��A�+�\"��C����<������ G� � �0� 7.����s��x��j�\\Ҏ��T��S��Z+��ޓo�j�Ij�8�T��  �� ܏ֹ���⤎y��ٓZ�Oyp��љ%l�Q��d���[Lֆ�F|�q ~���~Uw���Z^� ��� {�� '*Gr=j���� |P�YDY/ r�D���`��� �L�$�EF1kV`T���C,��    �I�� �\n���5�TV{�^��fD QNv 7� [�T'���z��湺\n��.#P�y��4���\r�+��e��ߣ=������� >�=���X�An'� H˴`�3�z�u�4M^����]��!��h�1� p F �{�V��Moj���E< �x�I �A�� �?�')��  [Vs WYc�k clB]�  �� (�& Ă�#�8�ӌTV�'�ݴ��?��3���\\J �^��=����C�?�s��\\[�/4EVt� �;�׊��_�Hm � ��xe[Q ��.�A� ?p�� �� K?�J�n�^�ۭ��y1��n 9�3�.y� (rG��RV����� �#\"Z�  -� :� qY �[j��I'd QE1  Q@  Q@  Q@  Q@  Q@ j��7�Av���?� ^#ڽ�N� �M��pO� W 3dvaz�GK�nN~ş��� �gG�M��dҼ�#y'�}�v |�j�� X�S^����E���� ��I� �l�UT�kX��X�n{�R�/�H �&�qی��7Z �l-�/-\"� B�����k����� �4�T� �7�ƞ��On��* ��  � �{4�- ھv� J~(����w� � \"v \\t8P?�w  �ޏ6�i<�i4�� ��''�\n�_���a��� � ?һ�(\"�t�`y��m \r#p0 $�Z��Q�\nT�3�ш�~ �F�� ��ԕe2�A GZ�D � k��� ��r�q�=�^+2�j 3�ݖgq�B�װh?�/��� ��*+�p�mܪ59�I  [�0��ci�� ٔg=�ֶ�����zKZ���   }�\\Eǀ�ine�g�ùa�n������tk������a@�d��rI ӥ �9~;�%>o���u ��כ}���  ��Go�<�5^��&����� \rp$�  ¸#��J�����M ��Sv5<8��� �o � �ˑ�C  cw � ] ��G�+y�D�e9dH�E#  ��9�W/��A}��mqr��>s#{ �9��+� ��$v�H�0��%�@��@'r  Q��T�K�VT �� 6���s � ��>��y� ` sn;�sVbд�a�E M vm:ݭ��� 8����?�5� � �7� F�04[eW>V ��.s�LU�,��m���ԡ���ű2I�s�!A $`�� /��Iw�cR�Ү��� M ���� �` ˷ ��\\�o4]2+K� H-��q��o<�����Y�×��-Զָ��S3� ��0  �}麆�t�*9�޷?ix   F��SIh���ո�w�n� ��v��K3 �/��I���c�}��ޛcs�j �oe B2>ұ�`>fq�9 �b� �;w���}���Ŷ� �l�s�c8�ѭiV�m��Gu��\\D%` � ���q��Qet��wk����k{=f��շA a ��`w� �M�ku�- ��Qj.G A8�С�~8�d  �3.��[?��1� W�ӭi\n�j�3�9'��Eo��nb�����\"\\8P��.r ����f�����Є�=� ��a�I ��H#��^)�X�'�˱�El��B]=o � ��R2N�_^�� � ޣZ���7, >f�����  �4��;���c ���i��\" �K��°��� �N�4��\r[F QE0\n(��\n(��\n(��\nߏ�:�P$)q DP���� ����P��$Td� ��������S�m���eX���� 8 ��VM � %f%' tZ�u �N����4� $( *���mWK�[[I�bRH 0y=k �N j�h59't΋� m{�~#� �KYڎ��j�����9� U�� �k:�J� �Cu$�l+v���ե�V�\\'� �@cR@  Ұ��(�[�FN;3�� ��^� ��� ���S��^�6��� �� ���5�EO��dW��q�H���H���,�rI�4�(� ���.,g �I�ɂ�� �� x5o�wS �\"܄1�F����V�6����ڳh�qOV���̻6�{<2��6��\"����  �j��T�%��C�X;�� K    �p \"�(��=��.�z� ; ����O��'���  �Aq�]�@!�v�1#K� ;�S��V�9b� 4�� �z��� j�|�+v�߳��� ٪�7S�y>|���� � j ����h����NM��6� �c ��1 � B��� � ==��z��6� h Y����I������? ΢�${ �]�%�u4������q\"� �  �/<z棏W�\"����Z�hN�� }���=� rG�s˹xj��c[C2�*� <H�T� �� CN���<��K E`�V �$  �_��\\�} rG�sK�f�����k� yk� QQTz � U���$�D�}(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� ��\r\nendstream\r\nendobj\r\n16 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS8 8 0 R>>/Font<</F5 18 0 R/F6 20 0 R/F7 23 0 R>>/XObject<</Image22 22 0 R/Image25 25 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 720 540] /Contents 17 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n17 0 obj\r\n<</Filter/FlateDecode/Length 540>>\r\nstream\r\nx��T�n�@ � �?�( �fI�K��Ϡ��6�C���ȏ֖ [n�/w妶% i� I�� ���ő )��H$-X����U G_/����둆�:� � �Ҡ��A��\"�>�� Ǆ ��r�  ߌ9� \r�ȝ��ħ漀`� h@ M0^�L��# � �� :.�9:�r Gߒ�\"U���J� �  ����� �}��  �sx\\l��.��q! �� �݀�LM  ��{? q4: p �    ����, 8 �# � �;��$ \rd��  D�\"�AK)T'a7MA��E\r�f ܸ:�̒v>٦��@;��a^6��z� S+ ��Đ�\"#`Q �nO���;�w�d W �Ŵ\"�w\r�O�� En JT��=�ȉ�z5���� �A�\\ s �ܬ�fYy)WP�. A��n�  �  ���{�?+<��*�0�I e�z ��B*K�  �e �W1��P��91�e�� h��=�Ƽ�ĳ�M�~��E�Y� MKöp ��-�I�9��Bur��J%���UK � �= �  M=� [C l � a�ʟC �ً�_@� ;ߠ?�� ��ك��� �Fh�\r\nendstream\r\nendobj\r\n18 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F5/BaseFont/BCDIEE+Calibri/Encoding/WinAnsiEncoding/FontDescriptor 19 0 R/FirstChar 32/LastChar 118/Widths 134 0 R>>\r\nendobj\r\n19 0 obj\r\n<</Type/FontDescriptor/FontName/BCDIEE+Calibri/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1743/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -503 -250 1240 750] /FontFile2 135 0 R>>\r\nendobj\r\n20 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F6/BaseFont/BCDJEE+Candara-Bold/Encoding/WinAnsiEncoding/FontDescriptor 21 0 R/FirstChar 32/LastChar 121/Widths 136 0 R>>\r\nendobj\r\n21 0 obj\r\n<</Type/FontDescriptor/FontName/BCDJEE+Candara-Bold/Flags 32/ItalicAngle 0/Ascent 725/Descent -275/CapHeight 725/AvgWidth 528/MaxWidth 1656/FontWeight 700/XHeight 250/StemV 52/FontBBox[ -496 -275 1160 725] /FontFile2 137 0 R>>\r\nendobj\r\n22 0 obj\r\n<</Type/XObject/Subtype/Image/Width 259/Height 194/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Interpolate true/Length 9525>>\r\nstream\r\n����  JFIF     � �  �� ZExif  MM *                 J            Q           Q          %Q          %      ��  ���� C \r \n \n \r     \r  !     (   !0*21/*.-4;K@48G9-.BYBGNPTUT3?]c\\RbKSTQ�� C       '  'Q6.6QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ��    �    \"       ��                             \n �� �                }        !1A  Qa \"q 2��� #B�� R��$3br� \n     %&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������                             \n �� �                w       !1  AQ aq \"2�  B���� #3R� br�\n $4�%�    &'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz��������������������������������������������������������������������������          ? �z(��AE P QKE % �P E P E  �� ˺w �;�%�fU�� �k�/��Mqs*��ȷ `�#>��횦l����}I��M  �P���?�q � ��R��zM�߽��5�GEO�=���\n�M",
      "tables_json": "[]",
      "filename": "S1 Introduction to the course.pdf"
    },
    {
      "id": "1ff7d51f-a081-4209-9134-756ebefae171",
      "material_id": "52ed5a65-6b8f-49d0-be2e-ee9c443b4d7e",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "item_type": "slide",
      "item_index": 1,
      "title": "S2 Problem Identification",
      "content": "%PDF-1.7\r\n%����\r\n1 0 obj\r\n<</Type/Catalog/Pages 2 0 R/Lang(en-IN) /Metadata 212 0 R/ViewerPreferences 213 0 R>>\r\nendobj\r\n2 0 obj\r\n<</Type/Pages/Count 36/Kids[ 3 0 R 14 0 R 32 0 R 35 0 R 38 0 R 42 0 R 49 0 R 51 0 R 55 0 R 73 0 R 80 0 R 84 0 R 93 0 R 95 0 R 97 0 R 99 0 R 101 0 R 103 0 R 105 0 R 107 0 R 114 0 R 116 0 R 118 0 R 120 0 R 127 0 R 129 0 R 131 0 R 133 0 R 135 0 R 137 0 R 139 0 R 141 0 R 143 0 R 145 0 R 152 0 R 155 0 R] >>\r\nendobj\r\n3 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS8 8 0 R>>/Font<</F1 6 0 R/F2 9 0 R/F3 11 0 R>>/XObject<</Image13 13 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 720 540] /Contents 4 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n4 0 obj\r\n<</Filter/FlateDecode/Length 539>>\r\nstream\r\nx��TMo�0 � ���� ��>,ݶa[�]�� = ;xY� � 4ˡ?���v�ak �E�z��I�c�!�BDb�\n*F� a�ȳ�+������B�;� ��  �����U�}˳G�I �  � ��3A�D��\n��l �   ���\r+�a�F0�>�����`�$U>� ��~�g������zQ����_�ٯ��y�_m7� �}γ��$Y ;WE ��|� E g �q(��^   �1�n� �N  � �Y9�<k� �UΤ�:�i�\n��U �  X� ��� �E��J� \\���F q�9\r�G�Ј� �, U9`1��l�������R� ��2� ��#� �5�� �$c) ځ���K�Z` � �f,{����zWNt �-���bS_n�M Τ��}� � c���Q�0y V�B�M���I�-� �bS�m�z�V�� ��ۗ�3� �p ��3���B]��y��L/�.�ǌf4�b ����w�O|�< ���� y���D\n�n ���� ���B(]�� QF�2�c2��xv�&$TC$o�</�zbb&qK�W8 ��۶n ���  � �\" \r\nendstream\r\nendobj\r\n5 0 obj\r\n<</Type/ExtGState/BM/Normal/ca 1>>\r\nendobj\r\n6 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F1/BaseFont/BCDEEE+Georgia-Bold/Encoding/WinAnsiEncoding/FontDescriptor 7 0 R/FirstChar 32/LastChar 116/Widths 160 0 R>>\r\nendobj\r\n7 0 obj\r\n<</Type/FontDescriptor/FontName/BCDEEE+Georgia-Bold/Flags 32/ItalicAngle 0/Ascent 917/Descent -217/CapHeight 756/AvgWidth 513/MaxWidth 1486/FontWeight 700/XHeight 250/StemV 51/FontBBox[ -190 -217 1295 756] /FontFile2 161 0 R>>\r\nendobj\r\n8 0 obj\r\n<</Type/ExtGState/BM/Normal/CA 1>>\r\nendobj\r\n9 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F2/BaseFont/BCDFEE+BookmanOldStyle/Encoding/WinAnsiEncoding/FontDescriptor 10 0 R/FirstChar 32/LastChar 120/Widths 162 0 R>>\r\nendobj\r\n10 0 obj\r\n<</Type/FontDescriptor/FontName/BCDFEE+BookmanOldStyle/Flags 32/ItalicAngle 0/Ascent 942/Descent -225/CapHeight 716/AvgWidth 492/MaxWidth 1503/FontWeight 300/XHeight 250/Leading 49/StemV 49/FontBBox[ -186 -225 1317 716] /FontFile2 163 0 R>>\r\nendobj\r\n11 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F3/BaseFont/BCDGEE+BookAntiqua-Bold/Encoding/WinAnsiEncoding/FontDescriptor 12 0 R/FirstChar 32/LastChar 120/Widths 164 0 R>>\r\nendobj\r\n12 0 obj\r\n<</Type/FontDescriptor/FontName/BCDGEE+BookAntiqua-Bold/Flags 32/ItalicAngle 0/Ascent 923/Descent -265/CapHeight 726/AvgWidth 459/MaxWidth 1327/FontWeight 700/XHeight 250/Leading 17/StemV 45/FontBBox[ -134 -265 1193 726] /FontFile2 165 0 R>>\r\nendobj\r\n13 0 obj\r\n<</Type/XObject/Subtype/Image/Width 300/Height 168/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Interpolate true/Length 4085>>\r\nstream\r\n����  JFIF     � �  �� ZExif  MM *                 J            Q           Q          %Q          %      ��  ���� C \r \n \n \r     \r  !     (   !0*21/*.-4;K@48G9-.BYBGNPTUT3?]c\\RbKSTQ�� C       '  'Q6.6QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ��    � ,  \"       ��                             \n �� �                }        !1A  Qa \"q 2��� #B�� R��$3br� \n     %&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������                             \n �� �                w       !1  AQ aq \"2�  B���� #3R� br�\n $4�%�    &'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz��������������������������������������������������������������������������          ? 娢��O (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� +Q<;��K\"i�20�  �Y}��t�� Z� � � �Es׬�Z��i*���uv�GԵ ���r� m��q�O֩������+������ ���+UZ�� dM()˕�uwiqep`���� J�^j$Vw �Y��*��] ��h�������o �ځ@� �(b9U `~9�*ܴ���.j� ����\" ]2� �Ƀ� w�#:�� '��v��\"�u),c�i�<oc&�  ���Z�� ����  � � ��j�y+��:tS���� �+�\"�tb��� EhC��bxRh���9 2�   A�Ws���{��|� M��2I��^àȽ�� ׬_� ��VT�DQ��6������� �� ^�G��̹��$ \\��>��u��A�+�\"��C����<������ G� � �0� 7.����s��x��j�\\Ҏ��T��S��Z+��ޓo�j�Ij�8�T��  �� ܏ֹ���⤎y��ٓZ�Oyp��љ%l�Q��d���[Lֆ�F|�q ~���~Uw���Z^� ��� {�� '*Gr=j���� |P�YDY/ r�D���`��� �L�$�EF1kV`T���C,��    �I�� �\n���5�TV{�^��fD QNv 7� [�T'���z��湺\n��.#P�y��4���\r�+��e��ߣ=������� >�=���X�An'� H˴`�3�z�u�4M^����]��!��h�1� p F �{�V��Moj���E< �x�I �A�� �?�')��  [Vs WYc�k clB]�  �� (�& Ă�#�8�ӌTV�'�ݴ��?��3���\\J �^��=����C�?�s��\\[�/4EVt� �;�׊��_�Hm � ��xe[Q ��.�A� ?p�� �� K?�J�n�^�ۭ��y1��n 9�3�.y� (rG��RV����� �#\"Z�  -� :� qY �[j��I'd QE1  Q@  Q@  Q@  Q@  Q@ j��7�Av���?� ^#ڽ�N� �M��pO� W 3dvaz�GK�nN~ş��� �gG�M��dҼ�#y'�}�v |�j�� X�S^����E���� ��I� �l�UT�kX��X�n{�R�/�H �&�qی��7Z �l-�/-\"� B�����k����� �4�T� �7�ƞ��On��* ��  � �{4�- ھv� J~(����w� � \"v \\t8P?�w  �ޏ6�i<�i4�� ��''�\n�_���a��� � ?һ�(\"�t�`y��m \r#p0 $�Z��Q�\nT�3�ш�~ �F�� ��ԕe2�A GZ�D � k��� ��r�q�=�^+2�j 3�ݖgq�B�װh?�/��� ��*+�p�mܪ59�I  [�0��ci�� ٔg=�ֶ�����zKZ���   }�\\Eǀ�ine�g�ùa�n������tk������a@�d��rI ӥ �9~;�%>o���u ��כ}���  ��Go�<�5^��&����� \rp$�  ¸#��J�����M ��Sv5<8��� �o � �ˑ�C  cw � ] ��G�+y�D�e9dH�E#  ��9�W/��A}��mqr��>s#{ �9��+� ��$v�H�0��%�@��@'r  Q��T�K�VT �� 6���s � ��>��y� ` sn;�sVbд�a�E M vm:ݭ��� 8����?�5� � �7� F�04[eW>V ��.s�LU�,��m���ԡ���ű2I�s�!A $`�� /��Iw�cR�Ү��� M ���� �` ˷ ��\\�o4]2+K� H-��q��o<�����Y�×��-Զָ��S3� ��0  �}麆�t�*9�޷?ix   F��SIh���ո�w�n� ��v��K3 �/��I���c�}��ޛcs�j �oe B2>ұ�`>fq�9 �b� �;w���}���Ŷ� �l�s�c8�ѭiV�m��Gu��\\D%` � ���q��Qet��wk����k{=f��շA a ��`w� �M�ku�- ��Qj.G A8�С�~8�d  �3.��[?��1� W�ӭi\n�j�3�9'��Eo��nb�����\"\\8P��.r ����f�����Є�=� ��a�I ��H#��^)�X�'�˱�El��B]=o � ��R2N�_^�� � ޣZ���7, >f�����  �4��;���c ���i��\" �K��°��� �N�4��\r[F QE0\n(��\n(��\n(��\nߏ�:�P$)q DP���� ����P��$Td� ��������S�m���eX���� 8 ��VM � %f%' tZ�u �N����4� $( *���mWK�[[I�bRH 0y=k �N j�h59't΋� m{�~#� �KYڎ��j�����9� U�� �k:�J� �Cu$�l+v���ե�V�\\'� �@cR@  Ұ��(�[�FN;3�� ��^� ��� ���S��^�6��� �� ���5�EO��dW��q�H���H���,�rI�4�(� ���.,g �I�ɂ�� �� x5o�wS �\"܄1�F����V�6����ڳh�qOV���̻6�{<2��6��\"����  �j��T�%��C�X;�� K    �p \"�(��=��.�z� ; ����O��'���  �Aq�]�@!�v�1#K� ;�S��V�9b� 4�� �z��� j�|�+v�߳��� ٪�7S�y>|���� � j ����h����NM��6� �c ��1 � B��� � ==��z��6� h Y����I������? ΢�${ �]�%�u4������q\"� �  �/<z棏W�\"����Z�hN�� }���=� rG�s˹xj��c[C2�*� <H�T� �� CN���<��K E`�V �$  �_��\\�} rG�sK�f�����k� yk� QQTz � U���$�D�}(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� �(� ��\r\nendstream\r\nendobj\r\n14 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</ExtGState<</GS5 5 0 R/GS8 8 0 R>>/Font<</F4 16 0 R/F5 18 0 R/F6 23 0 R/F7 25 0 R/F8 30 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 720 540] /Contents 15 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n15 0 obj\r\n<</Filter/FlateDecode/Length 662>>\r\nstream\r\nx��VMo�@ �[���  wg�-ET��H�zhAʡꁆ�к��i��;k/)  U.=  ������y�# ,c�!�̀� �dP�8���M ���*X�q��z 3�L� ��\"�>�� a  2�s`  G3�:��g��0[�Ԕ  �e jP��0��3!JϨ�!@�j��F���Ǜ8��L�T&�KE �g�������u ��yYW� �\\������b8�m� �W��5HC�$� zr/P�����\n�  l 2���D�� �g ���{ ����\n�a���r$��ض{�A� �b̚a����<���In��[X�. ������t����E����LU޹��+P���IMR�ɕ�{��HuwDH�i}Ύ�Ύ��ao�kB&�r� c�E��!� I��ǐ���8������p � >���Y���� ,��F�؈�M���P ��#� b���T>��nB%:|���M Z\n�� s�Wl�n��I[t�8�&��9���PB΃��&��~(s ,h�N��ۤ�F:������E��-ϔ�9��S���\n Qy�� U F�� �h�i]�w۲�  �{�a� �*CsJ�y �K����_��<���f�rU} t���Λo��q�-����m�vŲ� �\\y%' \r�EC�� �b=_m���d� xƎ �����Y9����ͻ�� �u\r_~��\r�U �I�H �ͫ����� B��{\r\nendstream\r\nendobj\r\n16 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F4/BaseFont/BCDHEE+Calibri/Encoding/WinAnsiEncoding/FontDescriptor 17 0 R/FirstChar 32/LastChar 122/Widths 169 0 R>>\r\nendobj\r\n17 0 obj\r\n<</Type/FontDescriptor/FontName/BCDHEE+Calibri/Flags 32/ItalicAngle 0/Ascent 750/Descent -250/CapHeight 750/AvgWidth 521/MaxWidth 1743/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -503 -250 1240 750] /FontFile2 167 0 R>>\r\nendobj\r\n18 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/ArialMT/Encoding/Identity-H/DescendantFonts 19 0 R/ToUnicode 170 0 R>>\r\nendobj\r\n19 0 obj\r\n[ 20 0 R] \r\nendobj\r\n20 0 obj\r\n<</BaseFont/ArialMT/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 21 0 R/FontDescriptor 22 0 R/W 172 0 R>>\r\nendobj\r\n21 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n22 0 obj\r\n<</Type/FontDescriptor/FontName/ArialMT/Flags 32/ItalicAngle 0/Ascent 905/Descent -210/CapHeight 728/AvgWidth 441/MaxWidth 2665/FontWeight 400/XHeight 250/Leading 33/StemV 44/FontBBox[ -665 -210 2000 728] /FontFile2 171 0 R>>\r\nendobj\r\n23 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F6/BaseFont/BCDIEE+Candara/Encoding/WinAnsiEncoding/FontDescriptor 24 0 R/FirstChar 32/LastChar 122/Widths 176 0 R>>\r\nendobj\r\n24 0 obj\r\n<</Type/FontDescriptor/FontName/BCDIEE+Candara/Flags 32/ItalicAngle 0/Ascent 725/Descent -275/CapHeight 725/AvgWidth 521/MaxWidth 1583/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -468 -275 1115 725] /FontFile2 174 0 R>>\r\nendobj\r\n25 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDJEE+Candara/Encoding/Identity-H/DescendantFonts 26 0 R/ToUnicode 173 0 R>>\r\nendobj\r\n26 0 obj\r\n[ 27 0 R] \r\nendobj\r\n27 0 obj\r\n<</BaseFont/BCDJEE+Candara/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 28 0 R/FontDescriptor 29 0 R/W 175 0 R>>\r\nendobj\r\n28 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n29 0 obj\r\n<</Type/FontDescriptor/FontName/BCDJEE+Candara/Flags 32/ItalicAngle 0/Ascent 725/Descent -275/CapHeight 725/AvgWidth 521/MaxWidth 1583/FontWeight 400/XHeight 250/StemV 52/FontBBox[ -468 -275 1115 725] /FontFile2 174 0 R>>\r\nendobj\r\n30 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F8/BaseFont/BCD",
      "tables_json": "[]",
      "filename": "S2 Problem Identification.pdf"
    },
    {
      "id": "08b56e7e-c434-4d64-8092-2d63eb70ec84",
      "material_id": "612957e8-ea45-4431-91ca-d0844c131692",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "item_type": "slide",
      "item_index": 1,
      "title": "Usage and Attitude Study",
      "content": "%PDF-1.7\r\n%����\r\n1 0 obj\r\n<</Type/Catalog/Pages 2 0 R/Lang(en) /Metadata 109 0 R/ViewerPreferences 110 0 R>>\r\nendobj\r\n2 0 obj\r\n<</Type/Pages/Count 8/Kids[ 3 0 R 30 0 R 33 0 R 53 0 R 62 0 R 66 0 R 68 0 R 72 0 R] >>\r\nendobj\r\n3 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</Font<</F1 5 0 R/F2 9 0 R/F3 14 0 R/F4 16 0 R/F5 21 0 R/F6 26 0 R/F7 28 0 R>>/ExtGState<</GS7 7 0 R/GS8 8 0 R>>/ProcSet[/PDF/Text/ImageB/ImageC/ImageI] >>/MediaBox[ 0 0 595.32 841.92] /Contents 4 0 R/Group<</Type/Group/S/Transparency/CS/DeviceRGB>>/Tabs/S>>\r\nendobj\r\n4 0 obj\r\n<</Filter/FlateDecode/Length 5877>>\r\nstream\r\nx��=]o#9�� � �i� �j}��\"�!� ����0=؇�{p;�i�$qO\\ӽ�_\"�]%�{.U�4Љ]%� ER$E1���������iA\n�ʒ�� �lY�ԝ���_�����g�6���l�����3hM\nZ��.���[R6�� ��ǟ���F.��[c��x~�ߋ����=?�A\r�_�g��> X\n �KF���e�  \\\r� ެ��%+B�X-��,���f���3��\\���w�Z\n��� ��gb�?C�`[|  �+� �5  |^�^2� �y�J��� I� JK\"bpUQ˪l�+� ���`�� S�Pd`��$CX� X��x� n �#�E��d�E�E]� p- V:�d \n��\n% �qv IF  �� ? �&7  i�5�o� �(�Z:�d�#�PdĐ ����<\r^H��z3��b{ �� �����d%�4퀺HV���>�4M�Y ��]W�^yzk���� �� �f���P�VaT�]� ù[|\\Yۄ ��u�d� ��� �qS�h j�Hj���z��dD�l� H i�@�  ���` סr Xz L�3Y e�q4�C� -YjőZ��r�丄�\\\\�2xo� HӰ�WH}�e�5��bY ͂*�؜� %Ӄ伔� �IϠ�'��S��_r�� ��ȧn�_kެlKbi�t ?xq���q  �[��� ;��EE)�<}p����Zkf ��� $0d�@S���1h ��Yh�5  ��j �l+T \"l啎�1�8� ��(�� �1� ��z  JR��ja�) &k� �O�� G�� ��q �U55 _��bٙcQdY5' X㚈  99 uS֊�Y$f�vC +� i7 �h���v{��^R\"�G�䒳`ٌ��Jܴ� C�� v��\r{�Zxx���\n�  ��M'^�u�8F늫ٸ�  >e~yjM(G��h:i�I � E�֒1��\nX5 *�L�  �Xܰ � ��ֳ� �e)� qt0 � Yxr4ڪlO-��\nY(M,�W�\r���>5ˑN�  V �  `��A���ޓ~�9 j���4����<e\nβ �J��t�A�Z�⿌l8j���ߘ m`5o���Զ���wP4�? m�T � 3N  v �� �Ӯ�� �� � }s{�w� � -�`�4�t0� ��m\\�� �(n�bF����5��<�����|s�ղq�4� `y�=>m\r�Veýo�f6$��7 �U �bw% Z���֚��|�gEJ>\n�] ��H��� \\4���}\nD �5�y� c� ?R��p�vh���  +��P7�< ]X�;  5O�  �jyF7�%NǇ�+��O  5q��b� {�DUV� {�8+��v«���I �\"6. z��~��i{g�y`�  ��� �@Z ��Cy�g���  �1Oʵ�e  ;���ML1U���kέ����6��Zy� � Ǯ� !9�uΫ�l���ްɥ����@��ceю�w �R��Ɠ�� M�   �� x3Ƚ  P�t� �m?=Ȇ����v �-�y���� ��]���bA��X<<_�E���/�ԇ��\\� �w}q�'Ň'Տ/  �� >��cw�� 0�G P5� �:��XC�FN�x��0�e5:3���� gb�4�;( )n����� 6A.C ����j� ��  �M��h\r� �� h  ��a��� � � N��gE ޲��b�FCS�8 Lc�U5�> �q�gO� ��N�.S�l)� ^�?� ��� �kXu䁢�� �� ^T\\+B6y����9\n��W ��|���#22��A3Ԟ����f��]W|TjO�� pWĻN�N�s\\4��S�z2�����澞 8 ϥai����-j#���� j9�����\" exx<�6R��9� ��P\r> �>� �Sq� �Z?\"c���� 4 oE�۩�= �U ⷯ�uI�3q] �溋eS-v�}��1�V����T�Vr�M=��=��\"�O�R{����pw�{�q�{�z�J�V�� �� �� < @� 8s�k[2� kɣ��K�zk-M  6o4�a��}�Y�V g�v��]� ��^o��#����� u� 0� |� Kc��� �T pZ��'YS�� �{�  �x  ��� � 9�S�\\��� � ��S�T� � D�W� ��_>�6��p� +HC���ux[���� ���% ��� IƁ CX? ���T���@+Z6� � �~�U� � x��1����Ϡ�i�<q��O� eUɛ >�/ ��{X�gD�kͮ� �h�Ѷ�A����rl�y� 狂�?v�f��[ݰ�0�v��Glq��}B[IJ���ŝ ��� �E�D�b�   �n�~j;:�@�· �@c�C��� � h= � e-���]��=m��l� ʧP�*��+5�� ��  �H�5���� BWD!ngoM�ýު������y� �lˊ�6  E[A,�u`A��  -_ �J�\nDɚ ��͍ Ӂ�v� � ۧ_�M�Q��V�� ���+�{�{)}c (g��f�pR���-?�/P �w%L����VIT�� ���J�aZ a\\������{{ �V� ��� �F�Ԙ  ��_/L�ʻ�g�yTSբߕ���~1=[7��x� � �O� �� �\nr�������t^C�,g �u�dX�Gp�<8Qu��r����8�� =�?-� �����DI��ϫ h�H i��*; ����'�w%ᵭy`s ��ڝ\"ZJ��0﫭, &M6H�YjO u/8�s���C>�к�@ ����  L ��cN3���&G�  � Y�.�§ \"�o ��:���ǰ��>�A�(�dľ�> ��q�>k�����>�K ѩ .5��| �Dc��֌-1ДȖpy>��.���];x��%��G����] ̧�Y\npܫ �� �[ Z$�Q�yt sԌ ���Mp�m���K��<��ә�ì��lGy_Ȁ r\nJ�-;̔ RP��q� `su��-������ a/�ri@H �� :s�j�J'�Dx��� �M;r3�hF ��# �фi�+��*�;�Z\\ �d�oeX#����f�\n�W�z�$r�N�py[ԭDc ���� �\r;�`|֑���w���_P ���:Q�F �A\\�~��q �VZ;��h��]M�w���K��� \"�,^7s�c� �8$����:ĩ�䇛lV_  �z�&ؐA� �YB:]fńC@�n�P� �=��P{� Ou' �� �� ��$IA $ ]  Dx](Lƫ ��ݩj�\r�k#��E� �Ũ, 6 )Rr6��w\r��0�h���\nI e\nN~5@�R�<9��Lj ^Y ?DL�T�u����i��Hm�g,��L�\r տ ��fGo����δ-`�\\�\r*� � v��x^ �Tm�M�t>  Ӭ�`G)j����E��R�N��4l�ќ���>%6U����f/� �#� \rK1��  �� �� ~04�.�� �� k����E Z�Ҁ'. ی� �Jf�Oܣpo2�to*�۶�_)�� �i �� ����>�� �#�� ���<F ; XAP �`�u�^=�� C�OG���>�V�{���!����� �<�I�c ��� �~L,�~��Cq�e �뎗�-Wo��;��c3w\"���4�wsl���=�>|U�9[�4ݹ\r&� o��� �-�Ǐj�-�����N0z�1�t�ԇ   ��3D&k�ړ,P ͒f�� (� ���p���cLQ�4��e�G��ƒ�\\ӑ6� � H8���v8�6�c �9�ޖ�h F*�5W �2Ђ` %��3� ;���0�h d���u�&���В\rT�)�#Uf�0P���e��M8�D � �� �w� �A���h���Ɩ �u٤�h� ��T�rD:jB��;�<���`�3�\\� 7���t�{�y{�ҁKJ��C�i$�2 2WÞ&�d���)�H9 �0 !y�� l(S�E� Z�� �\r������pC�5 �� ���7�$��S���hY����^ :� ��]>4ujܸo- `�%   �� ����U��'� ����Wl  $X\"�g6����D�R^TTD� c��KV��{�*x��b(}� �`� �W���@VJv9 ��P � � ��\n9*]   C�S8�uA6�>Ɖ��' ����陾}  W6�|��i�E����R>�O��7�O� ��� n֒�?o xE�!�< �nK��!A ^��J��i�KOפ= �H�@�H�D�A� O�Xᓁ)otg��>��z�K���}�%e���<`r� �5 ]�BR���Z�KL���g�ˀ,_�r��!/CҦ̭��||  ˄��  ,��#� ;9a��d�1�0�Ö  N3���\\�6Yg��ҁ� ��S�k��� ��j�Y�3.� �I`���9b�j/�\"��� 8��  ���> �#[5�qf��\npL�x\r({��K��� <���O27�$ �ƞ� $=�� +�R{��0. A^^Qq2 `M� �&�o ���L�� ��� ց�*b sCHϹ�* �D�� ���:>1�E��Pk��9$y�y��RW �ge�6C�G&IIy � ��  �,Hk� c:<�R� V�ѫ  ��%r ���^��\nk_ ��- �ܞ�Ū:< �W�5� ���]~�;��Ì��`9�{{3�)��+]�` )�q] 1� ��7� � ��Ǐ� �a���~��X�*B�0/0V������7� �b�� ڲ����#\rO�������k�2�S��R4^LÛ\r�{��ݵAE(������ �Q�'0� ��]� �=苲>�Z g�� ��v�Y�`�C���e ^��Ϯ�V> ����K ��NS� KV��c���{'k� Ή-I�Be�vx�\\ �I�b�8� ,c� �d�2�ݶ&݆ fHD���9.w�Na���a�� � =Χ�b��tO�� %^�M�G%���Oaf������Ȑ�>�J��k1H��w �Eż� =��ԫ &����y��QT�{  ��y�Pĭ���j����� ��2eڀ�4b�ؓ( ��Vd��-�0 �+�0��D>s� F0���\\�/C�&�m��W\r��q}����ӆ � �09r�o]� U\n1�J ����S� ` Y��J~��\\+>��W}P+���� �ː�. X  [�S~��~�/�m���/(c �� /^T����? ��$k���cg�At �46ҲZ� X �\\��x���N�h��G�v��� � �Z�i�]�R^N��ͬ��&X�� \r�q����  +��^쯤v� �5d �h��<�g{k� #�웾*�e ��+LE\r�i b$�IeNg  ԓ��� �� �w>��ޯ���v�D����N �_� ���B;;Ke�샷ܱdTr\\sI4� ��� C �� h�����d U�\r� � ե9aqD�� ۿ� ��45Z7�bً P��� 8�K  �9 A��������ݻ� �9H�S�c� v;�Z���! \"*y����3�{�� J '| Bd��� ���)��\nW� +  ��� =�\\<�,ܒ�m[�&G�y4s%ƕ�gS�I`���$� � X� �N?ux6�� U���u\"m ҐF��Z���\\��j _�}Y<(+v!����5�D���m0Y N  �8�j ܨ��;�d��R�T��� � �# �{B#WV!c �K���ث�t�O�D� ?��%�JH )l}�� +���% ۿ�� ����g �=�ֵ-q�~��u3$ H(k�Ar�� ��� <{�� �s��� ` �\n5���)�<���*�U��9 �s*V��x- ��6��M� ��  ��o �j �� �^��<js�� �� x�1i}�� r��s�v���?�A�vP��J�������  ��2z��&�EI��� H  �����YJ�\"\r��U`�J ������D;ZI  ΂pJ��>� � �#(h ���E��!R�( �� �nr�᲏hӈ���s+h�����q��F;���  ���� ��%�� `Z iA*�bG� =H�Wt[mZ��B\nP(ĪM;<�� 4=ر  V8� ��&� ��9� u�p�^�  ��� yE�.r � ���Xg �� HW�ӕ���}�4�ZR�9b¨^� ]� ���E|t ��� ��*>�@�..7�_2�%K� �� �\\O�`W? _6�����*��^q,M�E��O�,�n ��P�����ϗz�� x H%������R��� 7������L�|ji���Z�P�� K��r,o�� \\n���5ƕ����Kg� \r��i�Z��� u 牮`�=(i�tZ 5 �GX�N{ss�S��C�4R����yu�W�  [u��.��~~�����  �zv\r\nendstream\r\nendobj\r\n5 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F1/BaseFont/BCDEEE+BookAntiqua-Bold/Encoding/WinAnsiEncoding/FontDescriptor 6 0 R/FirstChar 32/LastChar 122/Widths 83 0 R>>\r\nendobj\r\n6 0 obj\r\n<</Type/FontDescriptor/FontName/BCDEEE+BookAntiqua-Bold/Flags 32/ItalicAngle 0/Ascent 923/Descent -265/CapHeight 726/AvgWidth 459/MaxWidth 1327/FontWeight 700/XHeight 250/Leading 17/StemV 45/FontBBox[ -134 -265 1193 726] /FontFile2 81 0 R>>\r\nendobj\r\n7 0 obj\r\n<</Type/ExtGState/BM/Normal/ca 1>>\r\nendobj\r\n8 0 obj\r\n<</Type/ExtGState/BM/Normal/CA 1>>\r\nendobj\r\n9 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDFEE+BookAntiqua-Bold/Encoding/Identity-H/DescendantFonts 10 0 R/ToUnicode 80 0 R>>\r\nendobj\r\n10 0 obj\r\n[ 11 0 R] \r\nendobj\r\n11 0 obj\r\n<</BaseFont/BCDFEE+BookAntiqua-Bold/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 12 0 R/FontDescriptor 13 0 R/W 82 0 R>>\r\nendobj\r\n12 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n13 0 obj\r\n<</Type/FontDescriptor/FontName/BCDFEE+BookAntiqua-Bold/Flags 32/ItalicAngle 0/Ascent 923/Descent -265/CapHeight 726/AvgWidth 459/MaxWidth 1327/FontWeight 700/XHeight 250/Leading 17/StemV 45/FontBBox[ -134 -265 1193 726] /FontFile2 81 0 R>>\r\nendobj\r\n14 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F3/BaseFont/BCDGEE+BookAntiqua/Encoding/WinAnsiEncoding/FontDescriptor 15 0 R/FirstChar 32/LastChar 122/Widths 87 0 R>>\r\nendobj\r\n15 0 obj\r\n<</Type/FontDescriptor/FontName/BCDGEE+BookAntiqua/Flags 32/ItalicAngle 0/Ascent 923/Descent -282/CapHeight 727/AvgWidth 445/MaxWidth 1290/FontWeight 400/XHeight 250/StemV 44/FontBBox[ -136 -282 1154 727] /FontFile2 85 0 R>>\r\nendobj\r\n16 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/BCDHEE+BookAntiqua/Encoding/Identity-H/DescendantFonts 17 0 R/ToUnicode 84 0 R>>\r\nendobj\r\n17 0 obj\r\n[ 18 0 R] \r\nendobj\r\n18 0 obj\r\n<</BaseFont/BCDHEE+BookAntiqua/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 19 0 R/FontDescriptor 20 0 R/W 86 0 R>>\r\nendobj\r\n19 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n20 0 obj\r\n<</Type/FontDescriptor/FontName/BCDHEE+BookAntiqua/Flags 32/ItalicAngle 0/Ascent 923/Descent -282/CapHeight 727/AvgWidth 445/MaxWidth 1290/FontWeight 400/XHeight 250/StemV 44/FontBBox[ -136 -282 1154 727] /FontFile2 85 0 R>>\r\nendobj\r\n21 0 obj\r\n<</Type/Font/Subtype/Type0/BaseFont/SymbolMT/Encoding/Identity-H/DescendantFonts 22 0 R/ToUnicode 88 0 R>>\r\nendobj\r\n22 0 obj\r\n[ 23 0 R] \r\nendobj\r\n23 0 obj\r\n<</BaseFont/SymbolMT/Subtype/CIDFontType2/Type/Font/CIDToGIDMap/Identity/DW 1000/CIDSystemInfo 24 0 R/FontDescriptor 25 0 R/W 90 0 R>>\r\nendobj\r\n24 0 obj\r\n<</Ordering(Identity) /Registry(Adobe) /Supplement 0>>\r\nendobj\r\n25 0 obj\r\n<</Type/FontDescriptor/FontName/SymbolMT/Flags 32/ItalicAngle 0/Ascent 1005/Descent -216/CapHeight 693/AvgWidth 600/MaxWidth 1113/FontWeight 400/XHeight 250/StemV 60/FontBBox[ 0 -216 1113 693] /FontFile2 89 0 R>>\r\nendobj\r\n26 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F6/BaseFont/ArialMT/Encoding/WinAnsiEncoding/FontDescriptor 27 0 R/FirstChar 32/LastChar 32/Widths 91 0 R>>\r\nendobj\r\n27 0 obj\r\n<</Type/FontDescriptor/FontName/ArialMT/Flags 32/ItalicAngle 0/Ascent 905/Descent -210/CapHeight 728/AvgWidth 441/MaxWidth 2665/FontWeight 400/XHeight 250/Leading 33/StemV 44/FontBBox[ -665 -210 2000 728] >>\r\nendobj\r\n28 0 obj\r\n<</Type/Font/Subtype/TrueType/Name/F7/BaseFont/BCDIEE+CourierNewPSMT/Encoding/WinAnsiEncoding/FontDescriptor 29 0 R/FirstChar 111/LastChar 111/Widths 95 0 R>>\r\nendobj\r\n29 0 obj\r\n<</Type/FontDescriptor/FontName/BCDIEE+CourierNewPSMT/Flags 32/ItalicAngle 0/Ascent 833/Descent -188/CapHeight 613/AvgWidth 600/MaxWidth 744/FontWeight 400/XHeight 250/StemV 60/FontBBox[ -122 -188 623 613] /FontFile2 93 0 R>>\r\nendobj\r\n30 0 obj\r\n<</Type/Page/Parent 2 0 R/Resources<</Font<</F5 21 0 R/F6 26 0 R/F4 16 0 R/F3 14 0 R/F1 5 0 R/F2 9 0 R>>/ExtGState<</GS7 7 0 R/",
      "tables_json": "[]",
      "filename": "Usage and Attitude Study.pdf"
    }
  ],
  "topics": [
    {
      "id": "1d7b3ec2-9feb-453f-9568-e2d338c6530d",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Introduction to Managerial Economics and Decision-Making",
      "description": "Explores how managerial economics applies economic principles to business decision-making, focusing on resource allocation, trade-offs, and strategic choices in product development, pricing, and production under constraints.",
      "sequence_order": 1,
      "subtopics_json": "[\"Managerial Decision-Making Scope\", \"Scarcity and Allocation of Resources\", \"Trade-offs in Consumption and Production\", \"Circular-Flow Model of the Economy\"]",
      "source_references_json": "[{\"filename\": \"session 1- Introduction.pptx\", \"slide_numbers\": [1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 14, 30, 31]}]",
      "is_completed": 0,
      "created_at": "2026-11-05T22:25:08.704036",
      "updated_at": "2026-11-05T22:25:08.704036",
      "subtopics": [
        "Managerial Decision-Making Scope",
        "Scarcity and Allocation of Resources",
        "Trade-offs in Consumption and Production",
        "Circular-Flow Model of the Economy"
      ],
      "source_references": [
        {
          "filename": "session 1- Introduction.pptx",
          "slide_numbers": [
            1,
            2,
            3,
            6,
            7,
            8,
            9,
            11,
            12,
            13,
            14,
            30,
            31
          ]
        }
      ]
    },
    {
      "id": "85b89826-ecf6-4de4-af73-57a586bcd3d5",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Economic Methodology: Theories, Models, and Analysis",
      "description": "Examines how economists use theories and mathematical models to explain real-world phenomena, make predictions, and differentiate between objective cause-and-effect analysis and value-based policy judgments.",
      "sequence_order": 2,
      "subtopics_json": "[\"Role of Theories and Economic Models\", \"Quantitative Predictions\", \"Positive Economic Analysis\", \"Normative Economic Analysis\"]",
      "source_references_json": "[{\"filename\": \"session 1- Introduction.pptx\", \"slide_numbers\": [21, 22, 23, 24]}]",
      "is_completed": 0,
      "created_at": "2026-11-05T22:25:08.704036",
      "updated_at": "2026-11-05T22:25:19.204794",
      "subtopics": [
        "Role of Theories and Economic Models",
        "Quantitative Predictions",
        "Positive Economic Analysis",
        "Normative Economic Analysis"
      ],
      "source_references": [
        {
          "filename": "session 1- Introduction.pptx",
          "slide_numbers": [
            21,
            22,
            23,
            24
          ]
        }
      ]
    },
    {
      "id": "0cd43efc-c92b-4b23-8349-4c58dc7e76ce",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Real versus Nominal Prices and Inflation Adjustment",
      "description": "Covers principles for measuring and comparing prices across time by adjusting nominal monetary values using the Consumer Price Index (CPI) to calculate real purchasing power.",
      "sequence_order": 3,
      "subtopics_json": "[\"Nominal Price vs. Real Price\", \"Consumer Price Index (CPI)\", \"Inflation Adjustment Calculations\", \"Historical Price Comparison\"]",
      "source_references_json": "[{\"filename\": \"session 1- Introduction.pptx\", \"slide_numbers\": [25, 26, 27, 28, 29]}]",
      "is_completed": 0,
      "created_at": "2026-11-05T22:25:08.704036",
      "updated_at": "2026-11-05T22:25:08.704036",
      "subtopics": [
        "Nominal Price vs. Real Price",
        "Consumer Price Index (CPI)",
        "Inflation Adjustment Calculations",
        "Historical Price Comparison"
      ],
      "source_references": [
        {
          "filename": "session 1- Introduction.pptx",
          "slide_numbers": [
            25,
            26,
            27,
            28,
            29
          ]
        }
      ]
    },
    {
      "id": "9082f4a9-1663-4065-a8a6-e512a66ba811",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Market Concepts and Structural Typologies",
      "description": "Defines the scope and boundaries of markets, analyzing price determination mechanisms across perfectly competitive and non-competitive market structures such as cartels and monopolies.",
      "sequence_order": 4,
      "subtopics_json": "[\"Definition and Scope of Markets\", \"Functioning of Market Mechanisms\", \"Perfectly Competitive Markets\", \"Noncompetitive Markets and Cartels\", \"Market Price Determination\"]",
      "source_references_json": "[{\"filename\": \"session 1- Introduction.pptx\", \"slide_numbers\": [4, 5, 15, 16, 17, 18, 19, 20]}]",
      "is_completed": 0,
      "created_at": "2026-11-05T22:25:08.704036",
      "updated_at": "2026-11-05T22:25:08.704036",
      "subtopics": [
        "Definition and Scope of Markets",
        "Functioning of Market Mechanisms",
        "Perfectly Competitive Markets",
        "Noncompetitive Markets and Cartels",
        "Market Price Determination"
      ],
      "source_references": [
        {
          "filename": "session 1- Introduction.pptx",
          "slide_numbers": [
            4,
            5,
            15,
            16,
            17,
            18,
            19,
            20
          ]
        }
      ]
    },
    {
      "id": "0485272d-6570-4060-b0ef-3c7f8db69921",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Curricular Roadmap: Advanced Microeconomic Frameworks",
      "description": "Provides an overview of the core analytical modules in managerial economics, spanning supply-demand dynamics, consumer utility maximization, production theory, and strategic firm behavior under game theory.",
      "sequence_order": 5,
      "subtopics_json": "[\"Demand, Supply, and Market Equilibrium\", \"Consumer Demand and Utility Maximization\", \"Theory of the Firm, Production, and Costs\", \"Firm Conduct, Pricing Strategies, and Game Theory\"]",
      "source_references_json": "[{\"filename\": \"session 1- Introduction.pptx\", \"slide_numbers\": [32, 33, 34, 35]}]",
      "is_completed": 0,
      "created_at": "2026-11-05T22:25:08.704036",
      "updated_at": "2026-11-05T22:25:08.704036",
      "subtopics": [
        "Demand, Supply, and Market Equilibrium",
        "Consumer Demand and Utility Maximization",
        "Theory of the Firm, Production, and Costs",
        "Firm Conduct, Pricing Strategies, and Game Theory"
      ],
      "source_references": [
        {
          "filename": "session 1- Introduction.pptx",
          "slide_numbers": [
            32,
            33,
            34,
            35
          ]
        }
      ]
    }
  ],
  "ai_notes": [
    {
      "id": "c5a4a99d-235d-4b4d-9aea-6408336024d1",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "topic_id": null,
      "title": "Economics - Complete MBA Notes",
      "content": "# Economics - Complete MBA Notes\n\n## 1. Topic Introduction\nManagerial Economics is the application of economic theory and quantitative methods to business decision-making. For an MBA student, this subject provides the analytical toolkit required to navigate constraints (budgets, time, production capacity) and make informed decisions regarding product design, pricing, market entry, and resource allocation. (Ref: Session 1, Slides 1, 11, 30)\n\n---\n\n## 2. Basic Explanation\nAt its core, economics is the study of **allocation under scarcity**. Because firms and consumers face limited resources, they must make trade-offs. \n*   **Consumers** aim to maximize well-being given their income.\n*   **Firms** aim to maximize profit given their production capacity and costs.\n*   **Markets** act as the mechanism where these two groups interact to determine prices and quantities. (Ref: Session 1, Slides 11-15)\n\n---\n\n## 3. Detailed Explanation & Frameworks\n\n### The Circular-Flow Model\nThis model illustrates the interaction between households and firms:\n*   **Households:** Supply resources (labor/capital) and demand goods/services.\n*   **Firms:** Supply goods/services and demand resources.\n*   **Flows:** Money flows as income to households (wages/rents) and as revenue to firms (product prices). (Ref: Session 1, Slide 9)\n\n### Market Structures\n| Market Type | Characteristics | Price Influence |\n| :--- | :--- | :--- |\n| **Perfect Competition** | Large number of buyers/sellers | None (Price Takers) |\n| **Noncompetitive** | Few players, cartels, or monopolies | High (Price Makers) |\n\n### Positive vs. Normative Analysis\n*   **Positive Analysis:** Focuses on \"what is\"—cause and effect (e.g., \"How will an AI-driven service sector impact growth?\").\n*   **Normative Analysis:** Focuses on \"what ought to be\"—value judgments (e.g., \"What should the minimum wage be?\"). (Ref: Session 1, Slides 23-24)\n\n---\n\n## 4. Important Definitions & Terminology\n*   **Nominal Price:** The absolute, current price of a good unadjusted for inflation.\n*   **Real Price:** The price of a good relative to an aggregate measure (adjusted for inflation).\n*   **Consumer Price Index (CPI):** A measure of the aggregate price level based on a \"market basket\" of goods purchased by a typical consumer.\n*   **Market:** A collection of buyers and sellers whose interaction determines the prices of goods.\n*   **Theory of the Firm:** A framework describing how firms make trade-offs regarding production and financial resources. (Ref: Session 1, Slides 13, 15, 25-28)\n\n---\n\n## 5. Practical Examples\n*   **Pricing Strategy:** A product manager for a detergent brand (e.g., Nirma vs. Wheel) must recognize that unlike gold (which has one price), their market has multiple price points based on brand positioning. (Ref: Session 1, Slide 20)\n*   **Inflation Adjustment:** To understand if a company's revenue growth is real or just a result of inflation, managers calculate real prices using the CPI. (Ref: Session 1, Slide 28)\n\n---\n\n## 6. Real-World Applications\n*   **Product Development:** Managers use consumer theory to understand preferences and segment sizes before designing features or packaging.\n*   **Regulatory Environment:** Managers must analyze government policies (taxes, subsidies, import/export rules) to predict market shifts.\n*   **Strategic Planning:** Firms use Game Theory to anticipate competitor moves in oligopolistic markets (e.g., OPEC in the oil market). (Ref: Session 1, Slides 2, 7, 19, 35)\n\n---\n\n## 7. Important Exam Points\n*   **Distinction:** Always differentiate between *Nominal* (current) and *Real* (inflation-adjusted) prices.\n*   **Constraint Management:** Remember that managerial economics is fundamentally about maximizing objectives (profit/utility) subject to constraints (time/budget).\n*   **Market Definition:** A market is defined by the specific range of products and the set of buyers/sellers involved.\n\n---\n\n## 8. Quick Revision Summary\n1.  **Inputs:** Managers need data on consumer wants, production technology, and market structure.\n2.  **Markets:** Prices are determined by the interaction of supply and demand.\n3.  **Analysis:** Use *Positive* analysis for predictions and *Normative* analysis for policy/value-based decisions.\n4.  **Models:** Theories (like the Theory of the Firm) are simplified into mathematical models to predict outcomes.\n\n---\n\n## 9. Key Takeaways\n1.  Economics provides the framework for making optimal decisions under scarcity.\n2.  Understanding market structure (Perfect vs. Noncompetitive) is vital for pricing strategy.\n3.  Real prices are essential for comparing performance across different time periods.\n4.  Firm behavior is driven by the need to balance production capacity with financial constraints.\n5.  Product managers must integrate consumer behavior, market structure, and government policy into their decision-making process.",
      "source_files_json": "[\"session 1- Introduction.pptx\"]",
      "version": 2,
      "created_at": "2026-11-05T22:24:24.675502",
      "updated_at": "2026-11-05T22:24:56.924749",
      "source_files": [
        "session 1- Introduction.pptx"
      ]
    },
    {
      "id": "db902e62-bbaf-4594-b411-fe9bbbee29b6",
      "subject_id": "60b11d3b-3e62-4b42-a411-7d67d87ad63a",
      "topic_id": null,
      "material_id": "612957e8-ea45-4431-91ca-d0844c131692",
      "source_files": [
        "Usage and Attitude Study.pdf"
      ],
      "source_files_json": "[\"Usage and Attitude Study.pdf\"]",
      "title": "Notes: Usage and Attitude Study",
      "content": "# Notes: Usage and Attitude Study\n\n## 1. Executive Summary & Core Objective\n*Note: Per the strict instruction to ground explanations exclusively in the provided source slide content, the foundational text available is restricted to PDF structural headers (e.g., objects 1–3, catalogs, pages, fonts, and resource dictionaries from Slide 1). No substantive business definitions or market research methodologies are present in the provided source text.*\n\n**Core Objective (Contextualized to Source Limitations):** \nTo understand the structural composition and programmatic object references that underpin a PDF document covering a \"Usage and Attitude (U&A) Study,\" acknowledging that the underlying text stream for substantive content retrieval is currently constrained by the raw PDF object structure provided.\n\n---\n\n## 2. Fundamental Concepts & Terminology\nBased strictly on the provided source text, the fundamental terminology is derived from PDF document architecture:\n*   **Catalog (`/Type/Catalog`):** The root object of the PDF document defining the document structure.\n*   **Pages Tree (`/Type/Pages`):** The hierarchical structure organizing the 8 total pages within the document (referenced via objects 3, 30, 33, 53, 62, 66, 68, and 72).\n*   **Resources (`/Resources`):** Collections of fonts (`/Font` mapping to objects like `F1` through `F7`), graphics states (`/ExtGState`), and procedure sets (`/ProcSet`) required to render the document.\n\n---\n\n## 3. In-Depth Frameworks & Models Explained\n*No conceptual market research frameworks, consumer behavior models, or U&A analytical matrices appear within the provided raw slide text.* \n\nFrom a structural standpoint, the framework is purely technical:\n*   **Document Object Model (DOM) for Presentation Slides:** Organizes metadata, viewer preferences, and page linkage trees to present linear educational slides.\n\n---\n\n## 4. Slide-by-Slide Detailed Walkthrough\n*   **Slide 1: Usage and Attitude Study**\n    *   **Header / Title:** Identifies the core topic as a \"Usage and Attitude Study.\"\n    *   **Underlying Code Layer:** Comprises standard PDF 1.7 syntax markers (`%PDF-1.7`, `%`), object identifiers (`1 0 obj`, `2 0 obj`, `3 0 obj`), and dictionary parameters establishing the document catalog, page tree count (8 pages), and resource dictionaries for fonts and graphic states.\n\n---\n\n## 5. Practical Business & Industry Applications\n*Because the provided source material lacks descriptive business content, business applications must be inferred strictly from the title header (\"Usage and Attitude Study\") in standard market research practice:*\n*   **Brand Tracking & Positioning:** Evaluating consumer usage metrics and brand attitudes over time.\n*   **Market Segmentation:** Grouping target audiences based on behavioral usage rates and psychographic attitudes.\n*   **Product Development:** Identifying unmet consumer needs by analyzing current product usage patterns.\n\n---\n\n## 6. Real-World Case Examples\n*   *No case examples are provided in the source slide text.*\n\n---\n\n## 7. Critical Exam Questions & High-Yield Takeaways\n*   **Q: What is the primary topic indicated by the source slide title?**\n    *   *A:* Usage and Attitude Study.\n*   **Q: How is the document structured according to the provided PDF object code?**\n    *   *A:* It is a PDF 1.7 document containing a catalog, a page tree spanning 8 kids/pages, and resource dictionaries managing fonts and graphic states.\n\n---\n\n## 8. Quick Revision Bullet Points\n*   **Topic:** Usage and Attitude Study.\n*   **Format:** PDF 1.7 document structure.\n*   **Page Count:** Total of 8 pages referenced in the page tree (`/Count 8`).\n*   **Resources:** Incorporates multiple font references (`F1`–`F7`) and external graphics states for rendering.",
      "version": 1,
      "created_at": "2026-11-06T10:14:01.682Z",
      "updated_at": "2026-11-06T10:14:01.682Z"
    }
  ],
  "self_notes": [
    {
      "id": "self_note_econ_01",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Managerial Economics - Core Lecture Insights",
      "content": "# Managerial Economics - Key Takeaways\n\n* **Fundamental Challenge:** Managing scarcity and resource allocation under constraints (limited budget, time, production capacity).\n* **Positive vs Normative Analysis:**\n  - *Positive:* Explanatory & predictive (cause and effect).\n  - *Normative:* Policy and value judgments (what ought to be).\n* **Market Dynamics:**\n  - Perfectly Competitive: Price takers (e.g. agricultural goods).\n  - Noncompetitive / Cartels: Price makers (e.g. OPEC, electricity).\n* **Price Adjustments:**\n  - Real Price = (Nominal Price / CPI) * 100.",
      "created_at": "2026-11-05T22:26:14.090682",
      "updated_at": "2026-11-05T22:26:14.090682"
    }
  ],
  "quizzes": [
    {
      "id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "title": "Economics - 10 MCQ Practice Quiz",
      "description": "Curated 10 Multiple-Choice Questions from uploaded PPTs",
      "total_questions": 10,
      "created_at": "2026-11-05T22:27:51.283769"
    }
  ],
  "quiz_questions": [
    {
      "id": "8960149a-5a2e-41e2-aa91-b622ceecb4e2",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 1,
      "question_text": "In the context of managerial economics, which of the following best describes the fundamental challenge firms face regarding resources?",
      "options_json": "[\"Unlimited production capacity\", \"The need to allocate scarce resources to make the most of limited budgets and time\", \"The ability to ignore market regulations\", \"The requirement to maximize output regardless of cost\"]",
      "correct_index": 1,
      "explanation": "Managerial economics deals with limits such as limited budgets, time, and production ability, requiring firms to make trade-offs and allocate scarce resources efficiently.",
      "source_reference": "Slide 11",
      "options": [
        "Unlimited production capacity",
        "The need to allocate scarce resources to make the most of limited budgets and time",
        "The ability to ignore market regulations",
        "The requirement to maximize output regardless of cost"
      ]
    },
    {
      "id": "d6950ca5-bd5b-48ce-8e52-836a3af986c1",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 2,
      "question_text": "Which of the following is a primary characteristic of a perfectly competitive market?",
      "options_json": "[\"Individual producers can significantly influence the price\", \"A small number of firms dominate the market\", \"No individual buyer or seller can influence the market price\", \"The government sets all prices\"]",
      "correct_index": 2,
      "explanation": "Perfectly competitive markets are defined by a large number of buyers and sellers, meaning no single participant has the power to influence the market price.",
      "source_reference": "Slide 18",
      "options": [
        "Individual producers can significantly influence the price",
        "A small number of firms dominate the market",
        "No individual buyer or seller can influence the market price",
        "The government sets all prices"
      ]
    },
    {
      "id": "6fc8f5b2-5527-4078-9a46-91a48c5bcc81",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 3,
      "question_text": "What is the primary distinction between positive and normative economic analysis?",
      "options_json": "[\"Positive analysis deals with cause and effect, while normative analysis deals with value judgments of what ought to be\", \"Positive analysis is mathematical, while normative analysis is descriptive\", \"Positive analysis is for firms, while normative analysis is for governments\", \"There is no distinction; they are interchangeable terms\"]",
      "correct_index": 0,
      "explanation": "Positive analysis focuses on explanation and prediction (cause and effect), whereas normative analysis examines questions of what ought to be, often involving value judgments.",
      "source_reference": "Slides 23-24",
      "options": [
        "Positive analysis deals with cause and effect, while normative analysis deals with value judgments of what ought to be",
        "Positive analysis is mathematical, while normative analysis is descriptive",
        "Positive analysis is for firms, while normative analysis is for governments",
        "There is no distinction; they are interchangeable terms"
      ]
    },
    {
      "id": "7a4effd6-d7b8-4123-af33-8423d4adc6ca",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 4,
      "question_text": "According to the Circular-Flow Model, what do households provide to firms in the resource market?",
      "options_json": "[\"Goods and services\", \"Wages and interest\", \"Resources\", \"Profits\"]",
      "correct_index": 2,
      "explanation": "In the circular-flow model, households supply resources to firms, while firms supply goods and services to households.",
      "source_reference": "Slide 9",
      "options": [
        "Goods and services",
        "Wages and interest",
        "Resources",
        "Profits"
      ]
    },
    {
      "id": "f92fb9fa-3f16-47ae-ae9c-0e27512fa026",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 5,
      "question_text": "Which of the following is considered a 'noncompetitive market' where producers can influence price?",
      "options_json": "[\"Agricultural markets\", \"The market for gold\", \"An electricity market or a cartel like OPEC\", \"A market with a very large number of small sellers\"]",
      "correct_index": 2,
      "explanation": "Noncompetitive markets allow producers to influence prices, such as in the electricity market or through cartels like OPEC.",
      "source_reference": "Slide 19",
      "options": [
        "Agricultural markets",
        "The market for gold",
        "An electricity market or a cartel like OPEC",
        "A market with a very large number of small sellers"
      ]
    },
    {
      "id": "0776afa2-41ac-4616-b79c-701bbbd72fb8",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 6,
      "question_text": "Why is the Consumer Price Index (CPI) used in economic analysis?",
      "options_json": "[\"To calculate the exact profit of a firm\", \"To measure the aggregate price level and calculate inflation\", \"To determine the production capacity of a factory\", \"To set the minimum wage for all sectors\"]",
      "correct_index": 1,
      "explanation": "The CPI records the prices of a market basket of goods to measure the aggregate price level, and percent changes in CPI indicate the rate of inflation.",
      "source_reference": "Slide 26",
      "options": [
        "To calculate the exact profit of a firm",
        "To measure the aggregate price level and calculate inflation",
        "To determine the production capacity of a factory",
        "To set the minimum wage for all sectors"
      ]
    },
    {
      "id": "f4fb84f7-ee2e-479f-b16f-f142a92b774a",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 7,
      "question_text": "When a product manager decides on the 'features' and 'packaging' of a product, which category of decision-making are they addressing?",
      "options_json": "[\"Market regulation\", \"Production facility capacity\", \"Design of the product\", \"Input market supply\"]",
      "correct_index": 2,
      "explanation": "Decisions regarding product features, size, and packaging fall under the 'Design of the product' category in managerial decision-making.",
      "source_reference": "Slide 2",
      "options": [
        "Market regulation",
        "Production facility capacity",
        "Design of the product",
        "Input market supply"
      ]
    },
    {
      "id": "5af6b237-d9b1-42c5-9078-63e9fd2ab12b",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 8,
      "question_text": "What is the purpose of economic models in managerial economics?",
      "options_json": "[\"To eliminate the need for data\", \"To provide mathematical representations used to make quantitative predictions\", \"To replace the need for theories\", \"To ensure that government policy is always correct\"]",
      "correct_index": 1,
      "explanation": "Economic models are derived from theories and serve as mathematical representations used to make quantitative predictions about observed phenomena.",
      "source_reference": "Slide 22",
      "options": [
        "To eliminate the need for data",
        "To provide mathematical representations used to make quantitative predictions",
        "To replace the need for theories",
        "To ensure that government policy is always correct"
      ]
    },
    {
      "id": "1ac00616-cadb-477f-a12e-7a28ddcf9bb1",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 9,
      "question_text": "In the context of the Theory of the Firm, why do firms face trade-offs?",
      "options_json": "[\"Because they have unlimited financial resources\", \"Because of constraints on production capacity and financial resources\", \"Because they do not care about profitability\", \"Because market prices are always fixed by the government\"]",
      "correct_index": 1,
      "explanation": "Firms face trade-offs because they operate under constraints regarding their production capacity and financial resources.",
      "source_reference": "Slide 13",
      "options": [
        "Because they have unlimited financial resources",
        "Because of constraints on production capacity and financial resources",
        "Because they do not care about profitability",
        "Because market prices are always fixed by the government"
      ]
    },
    {
      "id": "1b92bbea-6cd8-4059-ae15-79a860cee0a6",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "question_index": 10,
      "question_text": "Which of the following is a factor that must be analyzed when examining a market?",
      "options_json": "[\"Only the number of buyers\", \"Only the production cost\", \"Structure, conduct, and competition\", \"Only the government's import policy\"]",
      "correct_index": 2,
      "explanation": "Analyzing a market involves looking at its structure, conduct, competition, regulation, and policy.",
      "source_reference": "Slide 4",
      "options": [
        "Only the number of buyers",
        "Only the production cost",
        "Structure, conduct, and competition",
        "Only the government's import policy"
      ]
    }
  ],
  "quiz_attempts": [
    {
      "id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "quiz_id": "e88f9862-8ec9-43a5-a8b6-06d21fa26469",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "score": 6,
      "percentage": 60.0,
      "correct_count": 6,
      "incorrect_count": 4,
      "unanswered_count": 0,
      "time_taken_seconds": 48,
      "attempted_at": "2026-11-05T22:28:45.808633"
    }
  ],
  "quiz_answers": [
    {
      "id": "6f658001-464f-4149-9762-ece13f6f6726",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "8960149a-5a2e-41e2-aa91-b622ceecb4e2",
      "selected_index": 1,
      "is_correct": 1
    },
    {
      "id": "f47dd039-9357-49ed-955c-da0a364cb009",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "d6950ca5-bd5b-48ce-8e52-836a3af986c1",
      "selected_index": 0,
      "is_correct": 0
    },
    {
      "id": "1455e56c-7cbc-4d69-a1c4-1a7e4105a907",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "6fc8f5b2-5527-4078-9a46-91a48c5bcc81",
      "selected_index": 0,
      "is_correct": 1
    },
    {
      "id": "0c7467e4-8e8a-4c4f-b9c7-8907e2cab90f",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "7a4effd6-d7b8-4123-af33-8423d4adc6ca",
      "selected_index": 0,
      "is_correct": 0
    },
    {
      "id": "0c9a7201-4f81-43bf-824b-f3cf71c0a070",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "f92fb9fa-3f16-47ae-ae9c-0e27512fa026",
      "selected_index": 2,
      "is_correct": 1
    },
    {
      "id": "484a74c9-00d9-4b82-b30e-6c536974db77",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "0776afa2-41ac-4616-b79c-701bbbd72fb8",
      "selected_index": 0,
      "is_correct": 0
    },
    {
      "id": "98034ff4-cdc4-42d6-aa89-39094e7ff582",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "f4fb84f7-ee2e-479f-b16f-f142a92b774a",
      "selected_index": 1,
      "is_correct": 0
    },
    {
      "id": "f147cfb4-0db7-4da9-b786-3a635d085d6c",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "5af6b237-d9b1-42c5-9078-63e9fd2ab12b",
      "selected_index": 1,
      "is_correct": 1
    },
    {
      "id": "ed5bc788-e965-4110-b222-1d94edc0588c",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "1ac00616-cadb-477f-a12e-7a28ddcf9bb1",
      "selected_index": 1,
      "is_correct": 1
    },
    {
      "id": "656c7d84-7567-438a-9651-2e1c0b9f7218",
      "attempt_id": "b614ae37-3810-4bce-8594-ac7a7e7634ff",
      "question_id": "1b92bbea-6cd8-4059-ae15-79a860cee0a6",
      "selected_index": 2,
      "is_correct": 1
    }
  ],
  "study_sessions": [],
  "activities": [
    {
      "id": "d07dc3c0-d858-4cb6-ae6f-71ff23143f7f",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "subject_created",
      "title": "Created subject: Economics",
      "details": "",
      "timestamp": "2026-11-05T22:22:49.726908"
    },
    {
      "id": "0e75e83f-8443-4dc4-9b9e-a2d400d5f672",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "file_uploaded",
      "title": "Uploaded 1 study documents to Economics",
      "details": "",
      "timestamp": "2026-11-05T22:23:12.124028"
    },
    {
      "id": "08d8593c-e883-4a62-98b7-b626be8af8d6",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "notes_generated",
      "title": "Generated AI notes for 'Economics - Complete MBA Notes' in Economics",
      "details": "",
      "timestamp": "2026-11-05T22:24:24.689843"
    },
    {
      "id": "76b689bd-f059-41a1-b287-0cf03ae1ab05",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "topics_organized",
      "title": "AI organized 5 topics for Economics",
      "details": "",
      "timestamp": "2026-11-05T22:25:08.712787"
    },
    {
      "id": "fd130a6f-93c0-4ad4-bfa8-4c73e03701a8",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "self_note_created",
      "title": "Created personal note: 'New Study Note'",
      "details": "",
      "timestamp": "2026-11-05T22:26:14.090682"
    },
    {
      "id": "c846eac3-7794-43e7-b455-0a10ccecb8ac",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "quiz_generated",
      "title": "Generated 10-MCQ Quiz for Economics",
      "details": "",
      "timestamp": "2026-11-05T22:27:51.298589"
    },
    {
      "id": "3c013700-6fea-4ef6-9e4b-45b006d58888",
      "subject_id": "2093cfe1-7c0e-4a7d-9885-a357550d2084",
      "activity_type": "quiz_attempted",
      "title": "Scored 6/10 (60.0%) on Economics - 10 MCQ Practice Quiz",
      "details": "",
      "timestamp": "2026-11-05T22:28:45.828052"
    }
  ]
};

# Smart Library Assistant

**CS/DATA 398: Senior Project in Computing**  
**Calvin University**

**Authors:** David Kim, Jeton Cesaj, Zhonglin (Loya) Niu  
**Advisor:** Dr. Harry Plantinga  
**Date:** December 2025

---

## Vision Statement

The Smart Library Assistant transforms how researchers, students, and theologians interact with the Christian Classics Ethereal Library (CCEL). Traditional research methods require manually searching through vast archives of Christian literature—a time-consuming process that often yields irrelevant results. Our project leverages Retrieval-Augmented Generation (RAG) technology to create an intelligent chatbot that understands natural language queries, retrieves contextually relevant passages from theological texts, and generates accurate answers with traceable citations. By combining the contextual understanding of large language models with domain-specific retrieval from CCEL's extensive corpus, we enable users to ask nuanced theological questions and receive well-supported answers in seconds rather than hours.

---

## Normative and Ethical Considerations

### Transparency

**Potential consequence of ignoring:** Users might mistake AI-generated responses for authoritative theological interpretations, leading to misunderstanding or misrepresentation of original texts.

**Our approach:** Every response includes citation links that allow users to trace answers back to the original source paragraphs in CCEL. Users can verify the AI's interpretation against the primary text, maintaining intellectual honesty and enabling critical engagement with the material.

### Trust

**Potential consequence of ignoring:** An unreliable system could provide fabricated information or "hallucinations" that appear authoritative, potentially misleading theological research.

**Our approach:** Our system is grounded in retrieval-based generation rather than pure generation. The testing framework validates that responses are derived from actual source passages, not invented content. The 48.1% retrieval accuracy metric provides honest transparency about current system limitations, and we display source citations for every claim.

### Caring

**Potential consequence of ignoring:** A poorly designed interface could frustrate users or create barriers for those less familiar with technology, excluding potential beneficiaries.

**Our approach:** We designed an intuitive chat interface that requires no technical expertise. Filters allow users to narrow searches by author or work, and follow-up questions maintain conversational context. The system aims to democratize access to theological scholarship for students, independent researchers, and anyone seeking to engage with Christian classics.

### Stewardship

**Potential consequence of ignoring:** Inefficient use of computational resources (API calls, server capacity) could make the system unsustainable or unnecessarily costly.

**Our approach:** We implemented usage statistics tracking to monitor API consumption over 7-day and 30-day periods. The agentic RAG approach allows the AI to make intelligent decisions about when to retrieve additional context, reducing unnecessary API calls compared to a naive approach that retrieves maximum context for every query.

### Justice

**Potential consequence of ignoring:** The system could inadvertently privilege certain theological perspectives or authors over others based on how content is indexed or retrieved.

**Our approach:** The retrieval system treats all texts in the corpus equally based on semantic relevance rather than predetermined hierarchies. User-controlled filters allow explicit selection of specific authors or works when desired, giving users agency over their research scope.

---

## Background

### The Problem Space

Digital libraries contain vast repositories of scholarly and religious texts, but traditional keyword-based search systems often fail to understand user intent. A researcher asking "What did Augustine believe about free will?" must know the right keywords, locate relevant works, and manually synthesize information across multiple passages. This process is especially challenging for:

- Students unfamiliar with theological terminology
- Researchers exploring unfamiliar authors or periods
- Anyone seeking to understand how different church fathers addressed similar questions

### Prior Work and Existing Solutions

**Traditional Library Search Systems:** CCEL's existing search functionality uses keyword matching, which returns results containing exact terms but lacks semantic understanding. A search for "salvation" won't find passages discussing "redemption" or "being saved" unless those exact words appear.

**General-Purpose AI Chatbots:** Tools like ChatGPT can discuss theology but draw from training data rather than specific source texts. They cannot provide citations to original works and may generate plausible-sounding but inaccurate information (hallucinations).

**Retrieval-Augmented Generation (RAG):** RAG systems combine the strengths of retrieval-based and generation-based approaches. Introduced by Lewis et al. (2020), RAG retrieves relevant documents from a corpus and conditions language model generation on those documents. This grounds responses in actual sources while maintaining natural language fluency.

**Agentic RAG:** Recent advances extend RAG with agent-based architectures where the language model can dynamically decide when and how to retrieve information, refine queries, and synthesize multiple sources. This approach, which we adopted, allows more flexible and context-aware retrieval compared to single-shot RAG pipelines.

### Related Projects

Several projects have applied RAG to domain-specific corpora:

- **Legal AI assistants** retrieve case law and statutes to answer legal questions
- **Medical question-answering systems** ground responses in clinical literature
- **Academic search tools** like Semantic Scholar use embeddings for paper discovery

Our project applies these techniques specifically to historical Christian texts, addressing unique challenges such as archaic language, theological terminology, and the need to preserve interpretive nuance.

---

## Success Criteria

| Criterion              | Minimum Level                                                   | Stretch Level                                                                     | Status                                           |
| ---------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Source Attribution** | All responses include at least one citation link to source text | Citations link directly to specific paragraphs with highlighted relevant passages | ✅ Achieved (Minimum)                            |
| **Retrieval Accuracy** | Establish baseline accuracy metric through systematic testing   | Achieve >70% retrieval accuracy on test dataset                                   | ⚠️ Achieved 48.1% baseline; optimization ongoing |
| **Functional MVP**     | Working chatbot with basic query-response functionality         | Full-featured system with filters, conversation history, and usage analytics      | ✅ Achieved (Stretch)                            |
| **Deployment**         | System accessible via development URL                           | Production deployment integrated with CCEL infrastructure                         | ✅ Achieved (Minimum); CCEL integration planned  |

---

## Approach and Implementation

### System Architecture

[**INSERT ARCHITECTURE DIAGRAM HERE**]

_Diagram should show: User → Next.js Frontend → FastAPI Backend → Claude API + Manticore Search → Response with Citations_

The Smart Library Assistant follows a three-tier architecture:

**Frontend (Next.js)**
The web interface provides a responsive chat experience with the following components:

- Chat interface with message history and streaming responses
- Filter controls for selecting specific authors or works
- Citation display with clickable links to CCEL sources
- Statistics dashboard showing API usage over 7 and 30-day periods

**Backend (FastAPI + Python)**
The API server orchestrates the RAG pipeline:

- Receives user queries and conversation context
- Implements agentic RAG using LangChain and Anthropic's Claude API
- Queries Manticore Search for relevant passages
- Constructs prompts with retrieved context
- Streams generated responses back to the frontend

**Data Layer (Manticore Search)**
Manticore provides both full-text search and vector similarity search capabilities:

- Stores paragraph-level chunks from CCEL texts
- Maintains semantic embeddings for similarity search
- Supports filtered queries by author, work, and other metadata

### Technology Stack

| Layer            | Technology                  | Purpose                                     |
| ---------------- | --------------------------- | ------------------------------------------- |
| Frontend         | Next.js                     | React-based web application                 |
| Backend          | FastAPI, Uvicorn            | Async Python API server                     |
| LLM Integration  | Anthropic Claude, LangChain | Response generation and agent orchestration |
| Search/Retrieval | Manticore Search            | Vector and full-text search                 |
| Deployment       | Docker Compose              | Container orchestration on CCEL servers     |

### Agentic RAG Implementation

Our initial implementation used traditional RAG: retrieve top-K passages for every query, then generate a response. We found this approach had limitations—sometimes retrieving too much irrelevant context, other times missing important information that required query refinement.

We transitioned to an agentic RAG architecture where Claude acts as an intelligent agent that can:

1. Analyze the user's query to determine retrieval needs
2. Formulate optimized search queries
3. Decide whether retrieved results are sufficient or require additional searches
4. Synthesize information from multiple retrieval rounds
5. Generate responses grounded in retrieved passages

This approach improved response quality and efficiency by allowing the AI to adapt its retrieval strategy to each query's specific needs.

### Development Process

**Team Structure and Workflow**

- Weekly advisor meetings (Mondays at 10:30 AM) with Dr. Harry Plantinga
- GitHub-based version control with feature branches
- Regular team communication for integration between frontend and backend

**Development Timeline**

_Semester 1 (Spring 2025):_

- Established development environment and technology stack
- Implemented basic frontend chat interface
- Built initial RAG pipeline with Manticore integration
- Created MVP with basic query-response functionality
- Developed testing framework and initial dataset

_Semester 2 (Fall 2025):_

- Transitioned from traditional RAG to agentic RAG
- Implemented filter functionality (by author/work)
- Added usage statistics tracking
- Deployed to CCEL infrastructure via Docker
- Conducted comprehensive retrieval evaluation (2,716 queries)
- Refined UI/UX based on testing

### Challenges and Solutions

**Challenge 1: Response Latency**  
Initial implementations had noticeable delays between query submission and response delivery.

_Solution:_ Implemented streaming responses so users see the answer being generated in real-time rather than waiting for complete generation. The agentic approach also reduced unnecessary retrieval operations.

**Challenge 2: Retrieval Accuracy**  
Testing revealed a bimodal distribution where queries either succeeded completely (52.8%) or failed entirely (47.2%).

_Solution:_ Analysis identified query-corpus alignment as the primary issue. We implemented author and work filters to allow users to constrain searches, improving relevance for targeted queries. Further optimization (hybrid retrieval, query reformulation) is planned.

**Challenge 3: Citation Traceability**  
Ensuring every generated claim could be traced to specific source passages required careful prompt engineering and response parsing.

_Solution:_ Designed the system to return structured responses that pair generated text with source paragraph identifiers, enabling clickable citation links in the UI.

---

## Results

### Demo

The Smart Library Assistant is deployed and accessible at: https://sla.lniu.dart.ccel.org/chat

[**INSERT SCREENSHOT: Main chat interface showing a conversation**]

[**INSERT SCREENSHOT: Filter panel with author/work selection**]

[**INSERT SCREENSHOT: Response with citation links**]

[**INSERT SCREENSHOT: Statistics dashboard**]

### Retrieval System Evaluation

We conducted systematic testing using 2,716 queries generated from the Ante-Nicene Fathers Volume 1 corpus.

**Test Methodology:**

1. Parsed XML source documents and extracted 2,717 filtered paragraphs
2. Used Claude to generate realistic user questions for each paragraph
3. Queried the retrieval system and compared results against gold-standard paragraph mappings
4. Calculated position-aware scores (higher scores for results appearing in top positions)

**Key Results:**

| Metric                     | Value                 |
| -------------------------- | --------------------- |
| Total Queries Tested       | 2,716                 |
| Overall Accuracy           | 48.1%                 |
| Perfect Match Rate         | 52.8% (1,435 queries) |
| Complete Failure Rate      | 47.2% (1,281 queries) |
| Average Matched Rank       | 2.75 (top 3)          |
| Excellent Scores (0.9-1.0) | 41.1%                 |

**Analysis:**

The bimodal distribution reveals important insights about system behavior:

- **When retrieval succeeds**, it succeeds well—relevant paragraphs appear in the top 3 results on average
- **When retrieval fails**, it fails completely—no relevant paragraphs in top 15 results
- This pattern suggests systematic query-corpus alignment issues rather than gradual degradation

The testing framework used a template-based question format ("What did early Christians believe about [topic]?"), which may not align optimally with corpus embeddings. More diverse query formulations could improve coverage.

### Success Criteria Evaluation

| Criterion          | Target                      | Result                 | Assessment                              |
| ------------------ | --------------------------- | ---------------------- | --------------------------------------- |
| Source Attribution | Citations on all responses  | Implemented            | ✅ Met                                  |
| Retrieval Accuracy | Baseline metric established | 48.1% documented       | ✅ Met (baseline); stretch goal ongoing |
| Functional MVP     | Working chatbot             | Full features deployed | ✅ Exceeded                             |
| Deployment         | Accessible system           | Live on CCEL servers   | ✅ Met                                  |

---

## Future Work

### Short-Term Improvements (1-3 months)

**Retrieval Accuracy Optimization**

- Implement hybrid retrieval combining semantic search with BM25 keyword matching
- Test alternative query formulations to improve corpus alignment
- Add query expansion with theological synonyms
- Implement re-ranking with cross-encoder models

**User Experience Enhancements**

- Add conversation history persistence
- Improve mobile responsiveness
- Implement user feedback mechanism for continuous improvement

### Long-Term Goals

**CCEL Integration**
The primary long-term goal is integrating the Smart Library Assistant into the main CCEL website (ccel.org), making it accessible to CCEL's existing user base of researchers and theologians.

**Corpus Expansion**

- Extend testing and optimization to additional CCEL collections beyond Ante-Nicene Fathers
- Add support for multiple languages where translations exist

**Advanced Features**

- Cross-reference discovery (finding related passages across different works)
- Comparative analysis tools (e.g., "Compare Augustine's and Aquinas's views on X")
- Custom embedding models fine-tuned on theological terminology

---

## Conclusion

### Key Accomplishments

The Smart Library Assistant project successfully delivered a functional AI-powered research tool for theological texts:

1. **Working System:** Deployed a complete web application with chat interface, filtering, citations, and usage analytics
2. **Technical Innovation:** Implemented agentic RAG architecture that dynamically adapts retrieval strategy to query needs
3. **Rigorous Evaluation:** Established quantitative baseline (48.1% accuracy) through systematic testing of 2,716 queries
4. **Production Deployment:** Containerized deployment on CCEL infrastructure using Docker Compose

### Team Contributions

| Member              | Primary Responsibilities                                           |
| ------------------- | ------------------------------------------------------------------ |
| Zhonglin (Loya) Niu | Frontend development (Next.js), Docker deployment, UI/UX design    |
| Jeton Cesaj         | Backend development (FastAPI), RAG pipeline, Manticore integration |
| David Kim           | Testing framework, evaluation methodology, dataset generation      |

### Acknowledgements

We thank Dr. Harry Plantinga for his guidance throughout this project and for providing access to CCEL infrastructure and resources. We also thank Professor John Craton of Anderson University for providing dataset guidance and feedback on the project direction.

---

## References

Lewis, P., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. _Advances in Neural Information Processing Systems_, 33.

Christian Classics Ethereal Library. https://ccel.org

Anthropic. Claude API Documentation. https://docs.anthropic.com

Manticore Search Documentation. https://manual.manticoresearch.com

import { getPostData, getQuizData } from '@/lib/markdown';
import { generateStaticParamsForContentType, validatePostForRender } from '@/lib/static-params';
import PageHeader from '@/components/PageHeader';
import MarkdownContent from '@/components/MarkdownContent';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import StyleGuideStyles from '@/components/StyleGuideStyles';
import ResourceQuiz from '@/components/ResourceQuiz';
import { notFound } from 'next/navigation';

interface AssignmentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(dateString: string): string {
  // Handle the YYYY-MM-DD format from markdown frontmatter
  const date = new Date(dateString + 'T00:00:00');
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${dayOfWeek}, ${month}/${day}`;
}

export default async function AssignmentPage({ params }: AssignmentPageProps) {
  try {
    const { slug } = await params;
    const postData = await getPostData(slug, 'assignments');
    
    // Validate post (handles placeholder slugs and excluded posts)
    // Note: Drafts are allowed to be rendered (accessible via direct URL)
    if (!validatePostForRender(slug, postData, 'assignments')) {
      notFound();
    }
    
    const { heading_max_level } = postData;
    const isStyleGuideDemo = slug === 'style-guide-demo';
    const isTutorial02 = slug === 'tutorial02';
    const quizData = getQuizData(slug);
    
    return (
      <ContentLayout
        variant="detail-with-toc"
        leftNav={<QuickLinksNav />}
        showToc={postData.toc !== false}
        tocMaxLevel={heading_max_level || 2}
      >
        <div className={`assignment-page${isTutorial02 ? ' assignment-page-tutorial02' : ''}${postData.type === 'lab' ? ' lab-page' : ''}`}>
          <PageHeader 
            title={postData.title} 
            excerpt={postData.excerpt}
            type={postData.type}
            num={postData.num}
          />
          { postData.due_date && <p className="mt-2 text-lg font-bold">Due {formatDate(postData.due_date)} at 11:59pm</p> }
          {isStyleGuideDemo && <StyleGuideStyles />}
          <MarkdownContent content={postData.content} />
          {quizData && (
            <ResourceQuiz key={`quiz-${slug}`} quizData={quizData} resourceSlug={slug} variant="desktop" />
          )}
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}

// Tell Next.js to only generate routes that are in generateStaticParams()
// We include ALL posts (including drafts) in generateStaticParams() so they can be pre-generated
export const dynamicParams = false;

// Generate static params for all assignments
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return generateStaticParamsForContentType('assignments');
} 
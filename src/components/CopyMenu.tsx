import { useEffect, useRef, useState } from "react";

interface propTypes {
  text: string;
  markdown: string;
}

const CopyMenu = ({ text, markdown }: propTypes) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState<boolean>(false);
  const [isCopyTextDone, setIsCopyTextDone] = useState<boolean>(false);
  const [isCopyMarkdownDone, setIsCopyMarkdownDone] = useState<boolean>(false);

  const openMenu = () => {
    if (markdown.length === 0) {
      setShowEmptyMessage(true);
      setTimeout(() => {
        setShowEmptyMessage(false);
      }, 3000);
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close Menu
  useEffect(() => {
    const closeMenu = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    };
    document.addEventListener("mousedown", closeMenu)
    return () => {
      document.removeEventListener("mousedown", closeMenu)
    }
  }, [isMenuOpen])

  const copyToClipboard = () => {
    const textToCopy = text;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopyTextDone(true);
      setTimeout(() => {
        setIsCopyTextDone(false);
      }, 2500);
    });
  }

  const copyToMarkdown = () => {
    const markdownToCopy = markdown;

    navigator.clipboard.writeText(markdownToCopy).then(() => {
      setIsCopyMarkdownDone(true);
      setTimeout(() => {
        setIsCopyMarkdownDone(false);
      }, 2500);
    });
  }

  return (
    <>
      <button
        className="text-base py-5 font-semibold rounded-lg dark:bg-neutral-600 bg-neutral-200 hover:-translate-y-0.5 transition duration-150 ease-in-out"
        onClick={!isMenuOpen ? openMenu : undefined}
      >
        {showEmptyMessage
          ? "No Content to Copy"
          : "Copy to Clipboard"}
      </button>

      {isMenuOpen && (
        <div className="text-base absolute rounded-lg top-0 ml-2 mt-36 p-5 dark:bg-neutral-700 bg-neutral-100 shadow-lg" ref={menuRef}>
          <button
            className="py-5 w-48 mr-5 font-semibold rounded-lg dark:bg-neutral-600 bg-neutral-200 hover:-translate-y-0.5 transition duration-150 ease-in-out"
            onClick={copyToMarkdown}
          >
            {isCopyMarkdownDone ? "Copied as Markdown!" : "Copy as Markdown"}
          </button>
          <button
            className="py-5 w-48 font-semibold rounded-lg dark:bg-neutral-600 bg-neutral-200 hover:-translate-y-0.5 transition duration-150 ease-in-out"
            onClick={copyToClipboard}
          >
            {isCopyTextDone ? "Text Copied!" : "Copy as Plain Text"}
          </button>
        </div>
      )
      }
    </>
  );
}

export default CopyMenu

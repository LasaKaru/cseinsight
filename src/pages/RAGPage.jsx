import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ragService } from '../services/ragService';
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RAGPage = () => {
  const { isDark } = useTheme();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
      setAnalysis(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      setFile(droppedFile);
      setError('');
      setAnalysis(null);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const uploadResult = await ragService.uploadDocument(file, setUploadProgress);
      setUploading(false);
      setAnalyzing(true);

      const analysisResult = await ragService.analyzeDocument(uploadResult.id);
      setAnalysis(analysisResult);
    } catch (err) {
      setError('Failed to analyze document. Please try again.');
    } finally {
      setUploading(false);
      setAnalyzing(false);
      setUploadProgress(0);
    }
  };

  const clearFile = () => {
    setFile(null);
    setAnalysis(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Strong Buy':
        return 'text-green-400';
      case 'Buy':
        return 'text-green-300';
      case 'Hold':
        return 'text-yellow-400';
      case 'Sell':
        return 'text-red-300';
      case 'Strong Sell':
        return 'text-red-400';
      default:
        return isDark ? 'text-white' : 'text-gray-900';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Document Analyzer
            </h1>
            <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
              Upload financial reports for AI-powered analysis and insights
            </p>
          </div>

          {/* Upload Section */}
          <div
            className={`rounded-2xl p-8 mb-8 ${
              isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
            }`}
          >
            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDark
                    ? 'border-purple-600 hover:border-accent-cyan'
                    : 'border-gray-300 hover:border-emerald-500'
                }`}
              >
                <Upload
                  size={48}
                  className={`mx-auto mb-4 ${isDark ? 'text-purple-400' : 'text-gray-400'}`}
                />
                <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Drop your PDF here or click to browse
                </p>
                <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                  Maximum file size: 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText
                      size={24}
                      className={isDark ? 'text-accent-cyan' : 'text-emerald-600'}
                    />
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {file.name}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    className={`p-2 rounded-lg ${
                      isDark
                        ? 'text-purple-200 hover:bg-purple-800/50'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {uploading && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isDark ? 'text-purple-200' : 'text-gray-600'}>
                        Uploading...
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-purple-800' : 'bg-gray-200'}`}>
                      <div
                        className="h-full rounded-full bg-accent-cyan transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleUploadAndAnalyze}
                  disabled={uploading || analyzing}
                  className="w-full py-3 rounded-lg font-semibold text-gray-900 bg-accent-cyan hover:bg-accent-cyan/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Document'
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Summary */}
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Executive Summary
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                      Company
                    </p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {analysis.summary.companyName}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                      Sector
                    </p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {analysis.summary.sector}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                      Period
                    </p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {analysis.summary.reportPeriod}
                    </p>
                  </div>
                </div>
                <div>
                  <p className={`text-sm mb-2 ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Key Highlights
                  </p>
                  <ul className="space-y-2">
                    {analysis.summary.keyHighlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="text-green-400 mt-0.5 flex-shrink-0"
                        />
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Investment Opinion */}
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Investment Opinion
                </h2>
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  <div className="text-center">
                    <p
                      className={`text-3xl font-bold ${getRatingColor(
                        analysis.investmentOpinion.rating
                      )}`}
                    >
                      {analysis.investmentOpinion.rating}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                      AI Rating
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                        Confidence
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {analysis.investmentOpinion.confidence}%
                      </span>
                    </div>
                    <div className={`h-3 rounded-full ${isDark ? 'bg-purple-800' : 'bg-gray-200'}`}>
                      <div
                        className="h-full rounded-full bg-accent-cyan"
                        style={{ width: `${analysis.investmentOpinion.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className={`text-sm mb-2 ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                    Key Reasons
                  </p>
                  <ul className="space-y-2">
                    {analysis.investmentOpinion.reasons.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <TrendingUp size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={`mt-4 text-sm ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                  Recommended time horizon: {analysis.investmentOpinion.timeHorizon}
                </p>
              </div>

              {/* Key Metrics */}
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Key Metrics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(analysis.keyMetrics).map(([key, value]) => (
                    <div
                      key={key}
                      className={`p-4 rounded-lg ${isDark ? 'bg-purple-800/30' : 'bg-gray-50'}`}
                    >
                      <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-gray-500'}`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {typeof value === 'number' ? value.toFixed(2) : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div
                className={`p-4 rounded-lg text-sm ${
                  isDark
                    ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
                    : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                }`}
              >
                <p className="flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <strong>Disclaimer:</strong> This analysis is AI-generated and for informational
                  purposes only. Always conduct your own research before making investment decisions.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RAGPage;

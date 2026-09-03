import { X } from 'lucide-react';

function StoryEditorPanel({
  t,
  successStory,
  setSuccessStory,
  storyError,
  setStoryError,
  onCancel,
  onSave,
  saving
}) {
  const tx = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };

  return (
    <section className="profile-editor-panel">
      <div className="profile-editor-head">
        <h2>{tx('profile.editStory', 'Edit Success Story')}</h2>
        <button className="btn-icon" onClick={onCancel} aria-label="Close">
          <X size={20} />
        </button>
      </div>

      <div className="profile-story-editor">
        <p className="profile-note">{tx('auth.successStoryPrivacy', 'Your story will be reviewed before publishing.')}</p>
        <textarea
          className="profile-story-textarea"
          value={successStory}
          onChange={(e) => {
            setSuccessStory(e.target.value);
            setStoryError('');
          }}
          placeholder={tx('auth.successStoryPlaceholder', 'Share your progress journey...')}
          rows={8}
        />
        <div className="profile-story-meta">
          <span className={successStory.length < 50 ? 'warn' : successStory.length > 2000 ? 'danger' : 'ok'}>
            {successStory.length} / 2000
          </span>
          {successStory.length < 50 && (
            <span>{tx('auth.storyMinLength', 'Minimum 50 characters required.')}</span>
          )}
        </div>
        {storyError && <div className="profile-story-error">{storyError}</div>}
      </div>

      <div className="profile-editor-actions">
        <button className="btn btn-secondary" onClick={onCancel}>
          {tx('common.cancel', 'Cancel')}
        </button>
        <button className="btn btn-primary" onClick={onSave} disabled={saving}>
          {saving ? tx('common.loading', 'Saving...') : tx('common.save', 'Save')}
        </button>
      </div>
    </section>
  );
}

export default StoryEditorPanel;

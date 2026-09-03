import { X } from 'lucide-react';

function SkillsEditorPanel({
  t,
  categories,
  skills,
  skillsOffered,
  skillsWanted,
  toggleSkill,
  getSkillNameById,
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
        <h2>{tx('profile.editSkills', 'Edit Skills')}</h2>
        <button className="btn-icon" onClick={onCancel} aria-label="Close">
          <X size={20} />
        </button>
      </div>

      <div className="profile-editor-grid">
        {[
          {
            key: 'offered',
            title: tx('profile.skillsOffered', 'Skills Offered'),
            description: tx('auth.skillsIOfferDesc', 'Choose what you can teach.')
          },
          {
            key: 'wanted',
            title: tx('profile.skillsWanted', 'Skills Wanted'),
            description: tx('auth.skillsIWantDesc', 'Choose what you want to learn.')
          }
        ].map((block) => (
          <div key={block.key} className="profile-editor-column">
            <h3>{block.title}</h3>
            <p>{block.description}</p>

            {categories.map((category) => (
              <div key={category} className="profile-skill-group">
                <h4>{tx(`skills.${category}`, category)}</h4>
                <div className="profile-skill-options">
                  {skills
                    .filter((item) => item.category === category)
                    .map((item) => {
                      const selected = block.key === 'offered'
                        ? skillsOffered.includes(item.id)
                        : skillsWanted.includes(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`profile-skill-pill ${selected ? 'active' : ''}`}
                          onClick={() => toggleSkill(item.id, block.key)}
                        >
                          {getSkillNameById(item)}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        ))}
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

export default SkillsEditorPanel;

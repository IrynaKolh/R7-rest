class CreateFacts < ActiveRecord::Migration[7.0]
  def change
    create_table :facts do |t|
      t.references :member, null: false, foreign_key: true
      t.string :fact_text
      t.integer :likes

      t.timestamps
    end
  end
end

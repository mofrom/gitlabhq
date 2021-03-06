# frozen_string_literal: true

module Clusters
  class Project < ActiveRecord::Base
    self.table_name = 'cluster_projects'

    belongs_to :cluster, class_name: 'Clusters::Cluster'
    belongs_to :project, class_name: '::Project'

    has_many :kubernetes_namespaces, class_name: 'Clusters::KubernetesNamespace', foreign_key: :cluster_project_id
    has_one :kubernetes_namespace, -> { order(id: :desc) }, class_name: 'Clusters::KubernetesNamespace', foreign_key: :cluster_project_id
  end
end

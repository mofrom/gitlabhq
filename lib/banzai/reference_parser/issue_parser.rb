module Banzai
  module ReferenceParser
    class IssueParser < Parser
      self.reference_type = :issue

      def user_can_see_reference?(user, node)
        # It is not possible to check access rights for external issue trackers
        return true if project && project.external_issue_tracker

        issue = Issue.find_by(id: node.attr('data-issue'))

        Ability.abilities.allowed?(user, :read_issue, issue)
      end

      def referenced_by(node)
        [LazyReference.new(Issue, node.attr('data-issue'))]
      end
    end
  end
end

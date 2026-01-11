# frozen_string_literal: true

require "spec_helper"

describe DashboardProductsPagePresenter do
  let(:marketing_for_seller) { create(:user, username: "marketingforseller") }
  let(:support_for_seller) { create(:user, username: "supportforseller") }
  let(:seller) { create(:named_seller) }
  let(:pundit_user) { SellerContext.new(user: marketing_for_seller, seller:) }

  before do
    create(:team_membership, user: marketing_for_seller, seller:, role: TeamMembership::ROLE_MARKETING)
    create(:team_membership, user: support_for_seller, seller:, role: TeamMembership::ROLE_SUPPORT)
  end

  describe "#page_props" do
    let!(:archived_product) { create(:product, user: seller, archived: true) }

    it "returns archived_products_count and can_create_product" do
      presenter = described_class.new(pundit_user:)

      expect(presenter.page_props).to eq({
                                           archived_products_count: 1,
                                           can_create_product: true
                                         })
    end
  end

  describe "#products_table_props" do
    let!(:product) { create(:product, user: seller, name: "normal_product") }
    let!(:archived_product) { create(:product, user: seller, name: "archived_product", archived: true) }
    let!(:deleted_product) { create(:product, user: seller, name: "deleted_product", deleted_at: Time.current) }
    let!(:other_user_product) { create(:product, name: "other_product") }

    it "returns only the seller's visible non-archived products" do
      presenter = described_class.new(pundit_user:)
      product_names = presenter.products_table_props[:products].map { |p| p["name"] }

      expect(product_names).to include("normal_product")
      expect(product_names).not_to include("archived_product")
      expect(product_names).not_to include("deleted_product")
      expect(product_names).not_to include("other_product")
    end

    it "returns products with correct properties" do
      presenter = described_class.new(pundit_user:)
      returned_product = presenter.products_table_props[:products].first

      expect(returned_product).to include(
        "id" => product.id,
        "name" => "normal_product",
        "edit_url" => be_present,
        "is_duplicating" => false,
        "is_unpublished" => false,
        "permalink" => be_present,
        "price_formatted" => be_present,
        "status" => "published",
        "url" => be_present,
        "url_without_protocol" => be_present,
        "can_edit" => true,
        "can_destroy" => true,
        "can_duplicate" => true,
        "can_archive" => true,
        "can_unarchive" => false
      )
    end

    context "with search query" do
      let!(:another_product) { create(:product, user: seller, name: "another_product") }

      it "filters products by name" do
        presenter = described_class.new(pundit_user:, query: "another")
        product_names = presenter.products_table_props[:products].map { |p| p["name"] }

        expect(product_names).to include("another_product")
        expect(product_names).not_to include("normal_product")
      end

      it "returns empty results for a query that matches no products" do
        presenter = described_class.new(pundit_user:, query: "nonexistent_xyz")
        expect(presenter.products_table_props[:products]).to be_empty
      end
    end

    context "when the user has read-only access" do
      let(:pundit_user) { SellerContext.new(user: support_for_seller, seller:) }

      it "returns correct policy props" do
        presenter = described_class.new(pundit_user:)
        returned_product = presenter.products_table_props[:products].first

        expect(returned_product).to include(
          "can_edit" => false,
          "can_destroy" => false,
          "can_duplicate" => false,
          "can_archive" => false,
          "can_unarchive" => false
        )
      end
    end
  end

  describe "#memberships_table_props" do
    let!(:membership) { create(:membership_product, user: seller, name: "normal_membership") }
    let!(:archived_membership) { create(:membership_product, user: seller, name: "archived_membership", archived: true) }
    let!(:deleted_membership) { create(:membership_product, user: seller, name: "deleted_membership", deleted_at: Time.current) }
    let!(:other_user_membership) { create(:membership_product, name: "other_membership") }

    it "returns only the seller's visible non-archived memberships" do
      presenter = described_class.new(pundit_user:)
      membership_names = presenter.memberships_table_props[:memberships].map { |m| m["name"] }

      expect(membership_names).to include("normal_membership")
      expect(membership_names).not_to include("archived_membership")
      expect(membership_names).not_to include("deleted_membership")
      expect(membership_names).not_to include("other_membership")
    end

    it "returns memberships with correct properties" do
      presenter = described_class.new(pundit_user:)
      returned_membership = presenter.memberships_table_props[:memberships].first

      expect(returned_membership).to include(
        "id" => membership.id,
        "name" => "normal_membership",
        "edit_url" => be_present,
        "is_duplicating" => false,
        "is_unpublished" => false,
        "permalink" => be_present,
        "price_formatted" => be_present,
        "status" => "published",
        "url" => be_present,
        "url_without_protocol" => be_present,
        "can_edit" => true,
        "can_destroy" => true,
        "can_duplicate" => true,
        "can_archive" => true,
        "can_unarchive" => false
      )
    end

    context "with search query" do
      let!(:another_membership) { create(:membership_product, user: seller, name: "another_membership") }

      it "filters memberships by name" do
        presenter = described_class.new(pundit_user:, query: "another")
        membership_names = presenter.memberships_table_props[:memberships].map { |m| m["name"] }

        expect(membership_names).to include("another_membership")
        expect(membership_names).not_to include("normal_membership")
      end

      it "returns empty results for a query that matches no memberships" do
        presenter = described_class.new(pundit_user:, query: "nonexistent_xyz")
        expect(presenter.memberships_table_props[:memberships]).to be_empty
      end
    end

    context "when the user has read-only access" do
      let(:pundit_user) { SellerContext.new(user: support_for_seller, seller:) }

      it "returns correct policy props" do
        presenter = described_class.new(pundit_user:)
        returned_membership = presenter.memberships_table_props[:memberships].first

        expect(returned_membership).to include(
          "can_edit" => false,
          "can_destroy" => false,
          "can_duplicate" => false,
          "can_archive" => false,
          "can_unarchive" => false
        )
      end
    end
  end

  describe "products pagination" do
    before do
      stub_const("DashboardProductsPagePresenter::PER_PAGE", 2)
      create_list(:product, 5, user: seller)
    end

    it "returns paginated products" do
      presenter = described_class.new(pundit_user:, products_page: 1)
      expect(presenter.products_table_props[:products].length).to eq(2)
      expect(presenter.products_table_props[:products_pagination]).to be_present
    end

    it "returns correct page of products" do
      page1_presenter = described_class.new(pundit_user:, products_page: 1)
      page2_presenter = described_class.new(pundit_user:, products_page: 2)

      page1_ids = page1_presenter.products_table_props[:products].map { |p| p["id"] }
      page2_ids = page2_presenter.products_table_props[:products].map { |p| p["id"] }

      expect(page1_ids & page2_ids).to be_empty
    end
  end

  describe "memberships pagination" do
    before do
      stub_const("DashboardProductsPagePresenter::PER_PAGE", 2)
      create_list(:membership_product, 5, user: seller)
    end

    it "returns paginated memberships" do
      presenter = described_class.new(pundit_user:, memberships_page: 1)
      expect(presenter.memberships_table_props[:memberships].length).to eq(2)
      expect(presenter.memberships_table_props[:memberships_pagination]).to be_present
    end

    it "returns correct page of memberships" do
      page1_presenter = described_class.new(pundit_user:, memberships_page: 1)
      page2_presenter = described_class.new(pundit_user:, memberships_page: 2)

      page1_ids = page1_presenter.memberships_table_props[:memberships].map { |m| m["id"] }
      page2_ids = page2_presenter.memberships_table_props[:memberships].map { |m| m["id"] }

      expect(page1_ids & page2_ids).to be_empty
    end
  end

  describe "sorting" do
    let!(:product_a) { create(:product, user: seller, name: "AAA Product", price_cents: 500) }
    let!(:product_z) { create(:product, user: seller, name: "ZZZ Product", price_cents: 100) }

    it "sorts products by name ascending" do
      presenter = described_class.new(pundit_user:, products_sort: { key: "name", direction: "asc" })
      product_names = presenter.products_table_props[:products].map { |p| p["name"] }

      expect(product_names.first).to eq("AAA Product")
      expect(product_names.last).to eq("ZZZ Product")
    end

    it "sorts products by name descending" do
      presenter = described_class.new(pundit_user:, products_sort: { key: "name", direction: "desc" })
      product_names = presenter.products_table_props[:products].map { |p| p["name"] }

      expect(product_names.first).to eq("ZZZ Product")
      expect(product_names.last).to eq("AAA Product")
    end
  end

  describe "caching", :sidekiq_inline do
    let!(:product) { create(:product, user: seller) }
    let!(:membership) { create(:membership_product, user: seller) }

    it "caches dashboard data" do
      presenter = described_class.new(pundit_user:)

      expect do
        presenter.products_table_props
        presenter.memberships_table_props
      end.to change { ProductCachedValue.count }.by(2)
    end
  end

  context "with archived: true" do
    describe "#empty?" do
      context "when there are no archived products or memberships" do
        before do
          create(:product, user: seller)
          create(:membership_product, user: seller)
        end

        it "returns true" do
          presenter = described_class.new(pundit_user:, archived: true)
          expect(presenter.empty?).to be(true)
        end
      end

      context "when there are archived products" do
        before do
          create(:product, user: seller, archived: true)
        end

        it "returns false" do
          presenter = described_class.new(pundit_user:, archived: true)
          expect(presenter.empty?).to be(false)
        end
      end

      context "when there are archived memberships" do
        before do
          create(:membership_product, user: seller, archived: true)
        end

        it "returns false" do
          presenter = described_class.new(pundit_user:, archived: true)
          expect(presenter.empty?).to be(false)
        end
      end

      context "when there are only deleted archived products" do
        before do
          create(:product, user: seller, archived: true, deleted_at: Time.current)
        end

        it "returns true" do
          presenter = described_class.new(pundit_user:, archived: true)
          expect(presenter.empty?).to be(true)
        end
      end
    end

    describe "#page_props" do
      it "returns only can_create_product (no archived_products_count)" do
        presenter = described_class.new(pundit_user:, archived: true)
        expect(presenter.page_props).to eq({ can_create_product: true })
      end
    end

    describe "#products_table_props" do
      let!(:archived_product) { create(:product, user: seller, name: "archived_product", archived: true) }
      let!(:normal_product) { create(:product, user: seller, name: "normal_product") }
      let!(:deleted_archived_product) { create(:product, user: seller, name: "deleted_archived", archived: true, deleted_at: Time.current) }
      let!(:other_user_archived_product) { create(:product, name: "other_archived", archived: true) }

      it "returns only the seller's archived products" do
        presenter = described_class.new(pundit_user:, archived: true)
        product_names = presenter.products_table_props[:products].map { |p| p["name"] }

        expect(product_names).to include("archived_product")
        expect(product_names).not_to include("normal_product")
        expect(product_names).not_to include("deleted_archived")
        expect(product_names).not_to include("other_archived")
      end

      it "returns products with correct properties" do
        presenter = described_class.new(pundit_user:, archived: true)
        product = presenter.products_table_props[:products].first

        expect(product).to include(
          "id" => archived_product.id,
          "name" => "archived_product",
          "can_edit" => true,
          "can_destroy" => true,
          "can_archive" => false,
          "can_unarchive" => true
        )
      end

      context "with search query" do
        let!(:another_archived) { create(:product, user: seller, name: "another_archived", archived: true) }

        it "filters products by name" do
          presenter = described_class.new(pundit_user:, archived: true, query: "another")
          product_names = presenter.products_table_props[:products].map { |p| p["name"] }

          expect(product_names).to include("another_archived")
          expect(product_names).not_to include("archived_product")
        end

        it "returns empty results for a query that matches no archived products" do
          presenter = described_class.new(pundit_user:, archived: true, query: "nonexistent_xyz")
          expect(presenter.products_table_props[:products]).to be_empty
        end
      end
    end

    describe "#memberships_table_props" do
      let!(:archived_membership) { create(:membership_product, user: seller, name: "archived_membership", archived: true) }
      let!(:normal_membership) { create(:membership_product, user: seller, name: "normal_membership") }
      let!(:deleted_archived_membership) { create(:membership_product, user: seller, name: "deleted_archived", archived: true, deleted_at: Time.current) }
      let!(:other_user_archived_membership) { create(:membership_product, name: "other_archived", archived: true) }

      it "returns only the seller's archived memberships" do
        presenter = described_class.new(pundit_user:, archived: true)
        membership_names = presenter.memberships_table_props[:memberships].map { |m| m["name"] }

        expect(membership_names).to include("archived_membership")
        expect(membership_names).not_to include("normal_membership")
        expect(membership_names).not_to include("deleted_archived")
        expect(membership_names).not_to include("other_archived")
      end

      it "returns memberships with correct properties" do
        presenter = described_class.new(pundit_user:, archived: true)
        membership = presenter.memberships_table_props[:memberships].first

        expect(membership).to include(
          "id" => archived_membership.id,
          "name" => "archived_membership",
          "can_edit" => true,
          "can_destroy" => true,
          "can_archive" => false,
          "can_unarchive" => true
        )
      end

      context "with search query" do
        let!(:another_archived) { create(:membership_product, user: seller, name: "another_archived", archived: true) }

        it "filters memberships by name" do
          presenter = described_class.new(pundit_user:, archived: true, query: "another")
          membership_names = presenter.memberships_table_props[:memberships].map { |m| m["name"] }

          expect(membership_names).to include("another_archived")
          expect(membership_names).not_to include("archived_membership")
        end

        it "returns empty results for a query that matches no archived memberships" do
          presenter = described_class.new(pundit_user:, archived: true, query: "nonexistent_xyz")
          expect(presenter.memberships_table_props[:memberships]).to be_empty
        end
      end
    end

    describe "products pagination" do
      before do
        stub_const("DashboardProductsPagePresenter::PER_PAGE", 2)
        create_list(:product, 5, user: seller, archived: true)
      end

      it "returns paginated products" do
        presenter = described_class.new(pundit_user:, archived: true, products_page: 1)
        expect(presenter.products_table_props[:products].length).to eq(2)
        expect(presenter.products_table_props[:products_pagination]).to be_present
      end

      it "returns correct page of products" do
        page1_presenter = described_class.new(pundit_user:, archived: true, products_page: 1)
        page2_presenter = described_class.new(pundit_user:, archived: true, products_page: 2)

        page1_ids = page1_presenter.products_table_props[:products].map { |p| p["id"] }
        page2_ids = page2_presenter.products_table_props[:products].map { |p| p["id"] }

        expect(page1_ids & page2_ids).to be_empty
      end
    end

    describe "memberships pagination" do
      before do
        stub_const("DashboardProductsPagePresenter::PER_PAGE", 2)
        create_list(:membership_product, 5, user: seller, archived: true)
      end

      it "returns paginated memberships" do
        presenter = described_class.new(pundit_user:, archived: true, memberships_page: 1)
        expect(presenter.memberships_table_props[:memberships].length).to eq(2)
        expect(presenter.memberships_table_props[:memberships_pagination]).to be_present
      end

      it "returns correct page of memberships" do
        page1_presenter = described_class.new(pundit_user:, archived: true, memberships_page: 1)
        page2_presenter = described_class.new(pundit_user:, archived: true, memberships_page: 2)

        page1_ids = page1_presenter.memberships_table_props[:memberships].map { |m| m["id"] }
        page2_ids = page2_presenter.memberships_table_props[:memberships].map { |m| m["id"] }

        expect(page1_ids & page2_ids).to be_empty
      end
    end
  end

  describe "#empty?" do
    context "when archived: false (default)" do
      it "returns nil" do
        presenter = described_class.new(pundit_user:)
        expect(presenter.empty?).to be_nil
      end
    end
  end
end
